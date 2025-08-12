// OAuth JSON Handler - Run this in browser console when you see the JSON response
// Or save as a bookmark: javascript:(function(){...})();

(function() {
    try {
        // Get the JSON content from the page
        const pageText = document.body.innerText || document.body.textContent;
        
        // Try to parse the JSON
        const data = JSON.parse(pageText);
        
        if (data.token && data.user) {
            // Store the authentication data
            localStorage.setItem('auth_token', data.token);
            localStorage.setItem('auth_user', JSON.stringify(data.user));
            
            // Show success message
            alert(`Welcome ${data.user.name || data.user.username}! Redirecting to dashboard...`);
            
            // Redirect to your frontend dashboard
            window.location.href = 'http://localhost:3001/dashboard';
        } else {
            alert('Invalid OAuth response format');
        }
    } catch (error) {
        console.error('Error parsing OAuth response:', error);
        alert('Failed to parse OAuth response. Please try signing in again.');
        window.location.href = 'http://localhost:3001/auth/signin';
    }
})();
