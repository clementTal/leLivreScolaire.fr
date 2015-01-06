/** @jsx React.DOM */
//React module for one sutdent display
var Student = React.createClass({
    getInitialState: function() {
        return {showOption: false};
    },
    toogleOptions: function(e) {
        e.preventDefault();
        this.setState({showOption: !this.state.showOption});
    },
    closeOptions: function() {
        this.setState({showOption: false});
    },
    edit: function(e) {
        this.closeOptions();
        this.props.onClick();
        studentController.editedStudent = {name: this.props.data.name, last: this.props.data.last, email: this.props.data.email, picture: this.props.data.picture, student:  this.props.data};
    },
    delete: function(e) {
        this.closeOptions();
        studentController.deleteStudent(this.props.data.id);
    },
    render: function() {
        return (
            <div className='student' onMouseLeave={this.closeOptions} id={this.props.data.id}>
                <div className='student-image'>
                    <img src={this.props.data.picture}></img>
                </div>
                <div className='student-infos'>
                    <div className='student-title'>
{this.props.data.name} {this.props.data.last}
                    </div>
                    <div className='student-more'>
{this.props.data.email}
                    </div>
                </div>
                <div className='student-control' >
                    <div className='control-content'>
                        <span className='fa fa-ellipsis-v options' onClick={this.toogleOptions}></span>
                        <div className={this.state.showOption ? 'shown popup': 'popup'}>
                            <ul>
                                <li><i className="fa fa-pencil" onClick={this.edit}></i></li>
                                <li><i className="fa fa-trash" onClick={this.delete}></i></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
});

// React module for new student button
var NewStudentButton = React.createClass({
    render: function() {
        return(
            <div className='student new'>
                <div >
                    <img className='new-image' src="http://www.clker.com/cliparts/e/c/e/d/1352236885442170385Add%20Symbol.svg.hi.png"></img>
                </div>
            </div>
        )
    }
});

// React module for new sudent popup
var NewStudent = React.createClass({
    getInitialState: function() {
        return {name: "", last: "", email:"", picture: "http://icons.iconarchive.com/icons/icons8/ios7/512/Users-Add-User-icon.png"};
    },
    componentDidMount: function() {
        this.setState( {name: studentController.editedStudent.name, last: studentController.editedStudent.last, email: studentController.editedStudent.email, picture: studentController.editedStudent.picture ? studentController.editedStudent.picture : "http://icons.iconarchive.com/icons/icons8/ios7/512/Users-Add-User-icon.png"});
        this.forceUpdate();
    },
    handleChangeName: function(event) {
        this.setState({name: event.target.value});
    },
    handleChangeLast: function(event) {
        this.setState({last: event.target.value});
    },
    handleChangeEmail: function(event) {
        this.setState({email: event.target.value});
    },
    stopProp: function(e) {
        e.stopPropagation();
    },
    showInput: function(e) {
        this.refs.picUploader.getDOMNode().click();
    },
    saveStudent: function(e) {
        if (!studentController.editedStudent.student) {
            var createdStudent = {
                first: this.state.name,
                last: this.state.laste,
                email: this.state.email,
                picture: this.state.picture ? this.state.picture: "http://api.randomuser.me/portraits/lego/9.jpg"};
            studentController.createStudent(createdStudent);
        } else {
            studentController.updateStudent(studentController.editedStudent.student);
        }
        this.props.onClick();
    },
    render: function() {
        return(
            <div className='new-user-popup show' onClick={this.props.onClick}>
                <div className="new-form" onClick={this.stopProp}>
                    <div className="card card-z-1">
                        <div className="card-header">
{this.state.name ? 'Editer un élève': 'Ajout d\'un élève'}
                        </div>
                        <div className="card-content">
                            <form className="form" encType="multipart/form-data" ref="newStudentForm">
                                <div className="group">
                                    <input ref="name" type="text" required value={this.state.name} onChange={this.handleChangeName}/>
                                    <span className="highlight"></span>
                                    <span className="bar"></span>
                                    <label>Nom</label>
                                </div>
                                <div className="group">
                                    <input ref="lastName" type="text" required value={this.state.last} onChange={this.handleChangeLast}/>
                                    <span className="highlight"></span>
                                    <span className="bar"></span>
                                    <label>Prenom</label>
                                </div>
                                <div className="group">
                                    <input ref="email" type="text" required value={this.state.email}  onChange={this.handleChangeEmail}/>
                                    <span className="highlight"></span>
                                    <span className="bar"></span>
                                    <label>email</label>
                                </div>
                                <input className="hidden" type="file" accept="image/*" name="myPic" ref="picUploader" />
                            </form>
                            <div className="image-upload">
                                <img src={this.state.picture} onClick={this.showInput}/>
                            </div>
                        </div>
                        <div className="card-footer">
                            <a href="#" className="link secondary" onClick={this.props.onClick}>Annuler</a>
                            <a href="#" className="link primary" onClick={this.saveStudent}>Enregistrer</a>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

//Create a react module for the student list
var StudentList = React.createClass({
    getInitialState: function() {
        return {newUser: false};
    },
    hideForm: function(e) {
        this.setState({newUser: false});
        studentController.editedStudent = {};
    },
    addUser: function(e) {
        this.setState({newUser: true});
    },
    render: function() {
        var click = this.addUser;
        var newStudent = "";
        if (this.state.newUser) {
            newStudent = <NewStudent onClick={this.hideForm}/>;
        }
        var StudentList = this.props.data.map(function (student) {
            return (
                <Student data={student} onClick={click}></Student>
            );
        });
        return (
            <div className='content'>
                <div className='students'>
                    <div className='inline' onClick={this.addUser}>
                        <NewStudentButton/>
                    </div>
{StudentList}
                </div>
{newStudent}
            </div>
        )
    }
});

studentController.loadStudents();