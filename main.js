document.addEventListener('DOMContentLoaded', () => {
    let darkModeToggle = document.getElementById('darkModeToggle')
    let body = document.body
    
    let savedMode = localStorage.getItem('mode') || 'light'
    
    if (savedMode === 'dark') {
        body.style.backgroundColor = '#121212'
        body.style.color = '#ffffff'
        darkModeToggle.checked = true
    } else {
        body.style.backgroundColor = '#ffffff'
        body.style.color = '#000000'
        darkModeToggle.checked = false
    }
    
    darkModeToggle.addEventListener('change', () => {
        if (darkModeToggle.checked) {
            body.style.backgroundColor = '#121212'
            body.style.color = '#ffffff'
            localStorage.setItem('mode', 'dark')
        } else {
            body.style.backgroundColor = '#ffffff'
            body.style.color = '#000000'
            localStorage.setItem('mode', 'light')
        }
    })
    
   
    fetch('https://randomuser.me/api/?results=9')
        .then(response => response.json())
        .then(data => {
            const users = data.results
            const posts = [
                { title: 'Delicious Pasta', description: 'Discover the secrets to making the perfect pasta...', image: 'images/p1.jpg' },
                { title: 'Fresh Salads', description: 'Learn how to make crisp, refreshing salads...', image: 'images/place2.jpeg' },
                { title: 'Gourmet Desserts', description: 'Indulge in these delectable dessert recipes...', image: 'images/p2.jpg' },
                { title: 'Tasty Sandwiches', description: 'Quick and easy sandwiches for any meal...', image: 'images/p3.jpg' },
                { title: 'Healthy Smoothies', description: 'Refresh yourself with these healthy smoothies...', image: 'images/p4.jpg' },
                { title: 'Spicy Curries', description: 'Try these bold and spicy curry recipes...', image: 'images/p5.jpg' },
                { title: 'Vegetarian Delight', description: 'Explore some of the best vegetarian dishes...', image: 'images/p6.jpg' },
                { title: 'BBQ Favorites', description: 'Master the art of BBQ with these recipes...', image: 'images/p7.jpg' },
                { title: 'Chicken', description: 'new spices never seen before', image: 'images/p8.jpg' },
            ]

            const postsContainer = document.getElementById('posts-container')
            posts.forEach((post, index) => {
                const postHTML = `
                    <div class="col-md-4 mb-4">
                        <div class="card">
                            <img src="${post.image}" class="card-img-top" alt="Post Image">
                            <div class="card-body">
                                <h5 class="card-title">${post.title}</h5>
                                <p class="card-text">${post.description}</p>
                                <button class="btn btn-primary">Read More</button>
                                
                                <!-- Author Info -->
                                <div class="author-info mt-3">
                                    <img src="${users[index].picture.medium}" class="author-img" alt="Author Image">
                                    <p>By: ${users[index].name.first} ${users[index].name.last}</p>
                                </div>
                                
                                <!-- Comment Section -->
                                <div class="comment-section mt-4">
                                    <h6>Comments</h6>
                                    <form class="comment-form" id="comment-form-${index}">
                                        <textarea class="form-control" placeholder="Add a comment..." required></textarea>
                                        <button type="submit" class="btn btn-primary mt-2">Submit</button>
                                    </form>
                                    <ul class="comments-list mt-3" id="comments-list-${index}">
                                        <!-- Comments will appear here -->
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                `
                postsContainer.innerHTML += postHTML
            })

           
            document.querySelectorAll('.comment-form').forEach((form, index) => {
                form.addEventListener('submit', (e) => {
                    e.preventDefault()
                    const textarea = form.querySelector('textarea')
                    const commentText = textarea.value.trim()
                    if (commentText) {
                        const commentsList = document.getElementById(`comments-list-${index}`)
                        const newComment = document.createElement('li')
                        newComment.textContent = commentText
                        commentsList.appendChild(newComment)
                        textarea.value = ''
                    }
                })
            })
        })
        .catch(error => console.error('Error with the data:', error))
})




