
function logout() {
    // event.preventDefault();
     localStorage.removeItem('token');
     window.location.href = "index.html";
   }
   
