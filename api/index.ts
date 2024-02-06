Bun.serve({
  port: 3000,
  fetch(req){
    const url = new URL(req.url)

    if(url.pathname === '/') return new Response('Home Page')
    if(url.pathname === '/login') return new Response('Login Page')
    if(url.pathname === '/register') return new Response('Register Page')
    if(url.pathname === '/profile') return new Response('Profile Page')
    if(url.pathname === '/about') return new Response('About Page')

    return new Response('404')
  }
})

console.log('API Ativada')
