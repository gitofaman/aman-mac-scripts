$(document).ready(function () {
    const firebaseConfig = {
        apiKey: "AIzaSyCefoTqCGogn_ac0y1aJRoPcpd5a3Vjv-Q",
        authDomain: "form-end.firebaseapp.com",
        databaseURL: "https://form-end-default-rtdb.firebaseio.com",
        projectId: "form-end",
        storageBucket: "form-end.appspot.com",
        messagingSenderId: "656602418267",
        appId: "1:656602418267:web:8213089630cf31ae1b437e",
        measurementId: "G-HHPMQ4LTF6"
    };

    // Initialize Firebase
    firebase.initializeApp(firebaseConfig)

    //reference your database
    const signUpFormDB = firebase.database().ref('sign-up-data')

    var submitForm = (e) => {
        e.preventDefault();
        var name = $('#name').val()
        var email = $('#email').val()
        var password = $('#password').val()

        saveNewCustomer(name, email, password)
    }

    const saveNewCustomer = (name, email, password) => {
        var newCustomer = signUpFormDB.push();
        newCustomer.set({
            name: name,
            email: email,
            password: password
        })
        alert('New customer saved')
        $('#sign-up-form')[0].reset()
    }

    $('#sign-up-form').on('submit', submitForm)
})