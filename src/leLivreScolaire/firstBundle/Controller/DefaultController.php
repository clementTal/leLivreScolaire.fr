<?php

namespace leLivreScolaire\firstBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

use leLivreScolaire\firstBundle\Entity\Student;
use Symfony\Component\HttpFoundation\Response;

class DefaultController extends Controller
{
    // TODO: use services for model querying
    /**
     * Initial controller.
     * @return Response the response to display
     */
    public function indexAction()
    {
        return $this->render('leLivreScolairefirstBundle::index.html.twig');
    }

    /**
     * get All student from db
     * @return Response an json with all student
     */
    public function getAllAction()
    {
        $students = $this->getDoctrine()
            ->getRepository('leLivreScolairefirstBundle:Student')
            ->findAll();

        $response = new Response(json_encode($students));
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }

    /**
     * Init db with fake data
     * @return Response
     */
    public function createAction()
    {
        $student = new Student();
        $student->setName('Toto');
        $student->setLastName('Dupuis');
        $student->setEmail('toto@gmail.com');
        $student->setPictureUrl('http://api.randomuser.me/portraits/lego/2.jpg');

        $em = $this->getDoctrine()->getManager();
        $em->persist($student);
        $em->flush();

        return new Response('Id du student créé : '.$student->getId());
    }

    /**
     * Update a student by it's id
     * @param $id the student id
     * @param $newStudent the new data for the student
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function updateAction($id, $newStudent)
    {
        $em = $this->getDoctrine()->getManager();
        $student = $em->getRepository('leLivreScolairefirstBundle:Student')->find($id);

        if (!$student) {
            throw $this->createNotFoundException(
                'Aucun etudiant trouvé pour cet id : '.$id
            );
        }

        $student->setName($newStudent->name);
        $student->setLastName($newStudent->last);
        $student->setEmail($newStudent->email);
        $student->setPictureUrl($newStudent->picture);
        $em->flush();

        return $this->redirect($this->generateUrl('/'));
    }

    /**
     * Delete a student from db
     * @param $id the id of the student to delete
     * @return \Symfony\Component\HttpFoundation\RedirectResponse
     */
    public function deleteAction($id, $newStudent)
    {
        $em = $this->getDoctrine()->getManager();
        $student = $em->getRepository('leLivreScolairefirstBundle:Student')->find($id);

        $em->remove($student);
        $em->flush();

        return $this->redirect($this->generateUrl('/'));
    }
}
