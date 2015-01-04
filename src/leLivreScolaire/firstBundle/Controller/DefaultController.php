<?php

namespace leLivreScolaire\firstBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction()
    {
        return $this->render('leLivreScolairefirstBundle::index.html.twig');
    }
}
