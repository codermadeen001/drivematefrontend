async function loadUserDetails() {
    const token = localStorage.getItem("token");

    if (!token) {
       window.location.href = "index.html";
       //alert("no token")
        return;
    }

    try {
        const response = await fetch('https://drivemate-1.onrender.com/api/users/user/', {
            method: "GET",
            headers: {
              "Authorization": `Bearer ${token}`,

                "Content-Type": "application/json"
            }
        });

        const data = await response.json();

        if (!data.success) {
            localStorage.removeItem('token');
            window.location.href = "index.html";
            return;
        }

        const user = data.user;
       

        // Optional: restrict by role
        if (user.role !== "admin") {
            localStorage.removeItem('token');
            window.location.href = "index.html";
            return;
        }


        // Dynamically set values into HTML
        document.getElementById("dp").src = user.profile_picture || "default_dp.jpg";
        document.getElementById("name").textContent = user.name || "No Name";
        document.getElementById("email").textContent = user.email || "No Email";

    } catch (error) {
        console.error("Error fetching user:", error);
        window.location.href = "index.html";
    }
}

document.addEventListener("DOMContentLoaded", loadUserDetails);
