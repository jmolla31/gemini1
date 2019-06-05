firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var uid = user.uid;
        var phoneNumber = user.phoneNumber;
        var providerData = user.providerData;
        user.getIdToken().then(function (accessToken) {

            console.log(JSON.stringify({
                displayName: displayName,
                email: email,
                emailVerified: emailVerified,
                phoneNumber: phoneNumber,
                photoURL: photoURL,
                uid: uid,
                accessToken: accessToken,
                providerData: providerData
            }, null, '  '));

            document.getElementById("btnSignOut").innerHTML = 'Eixir (' + email + ')';
        });
    } else {
        window.location.href = '/login.html';
    }
});

document.getElementById("btnSignOut").addEventListener("click", x => {
    firebase.auth().signOut().then(function() {
        console.log("Signed out!");
      }).catch(function(error) {
        console.log("An error happened" + error );
      });
});

