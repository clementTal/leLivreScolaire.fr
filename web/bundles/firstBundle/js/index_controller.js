console.info('ok');

/**
 * Student controller
 */
var studentController = (function() {
    return {
        //Load students using ajax and render react components
        loadStudents: function () {
            $.ajax({
                url: '/Symfony/web/app_dev.php/student/getAll',
                dataType: 'json',
                success: function (data) {
                    USERS = data;
                    React.renderComponent(StudentList({data: USERS}), document.getElementById('container'));
                }
            });
        },
        // Deletes users for db and render react component
        deleteStudent: function(idToDelete) {
            $.post('/Symfony/web/app_dev.php/student/delete',{id: idToDelete},function(data) {
                USERS = data;
                React.renderComponent(StudentList({data: USERS}), document.getElementById('container'));
            });
        },
        updateStudent: function(studentToUpdate) {
            $.post('/Symfony/web/app_dev.php/student/update',{
                studentId: studentToUpdate.id,
                studentName: studentToUpdate.name,
                studentLast: studentToUpdate.last,
                studentEmail: studentToUpdate.email,
                studentPicture: studentToUpdate.picture
            },function(data) {
                USERS = data;
                React.renderComponent(StudentList({data: USERS}), document.getElementById('container'));
            });
        },
        createStudent: function(studentToCreate) {

        },
        USERS: {},
        editedStudent: {}
    };
})();
