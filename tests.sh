echo 'GET / (should return 200)'
curl -s -S -I http://localhost:3000/ | grep HTTP/1.1
echo ''

echo 'GET /asfafasfasfafasfa (should return 404 as invalid route)'
curl -s -S -I http://localhost:3000/asfafasfasfafasfa | grep HTTP/1.1
echo ''

echo 'GET /about (should return 200)'
curl -s -S -I http://localhost:3000/about | grep HTTP/1.1
echo ''

echo 'GET /products (should return 200)'
curl -s -S -I http://localhost:3000/products | grep HTTP/1.1
echo ''

echo 'GET /products/abc123 (should return 400 as invalid item id)'
curl -s -S -I http://localhost:3000/products/123 | grep HTTP/1.1
echo ''

echo 'GET /auth/signup (should return 200)'
curl -s -S -I http://localhost:3000/auth/signup | grep HTTP/1.1
echo ''

echo 'GET /auth/login (should return 200)'
curl -s -S -I http://localhost:3000/auth/login | grep HTTP/1.1
echo ''

echo 'GET /auth/forgot (should return 200)'
curl -s -S -I http://localhost:3000/auth/forgot | grep HTTP/1.1
echo ''

echo 'GET /auth/logout (should return 200)'
curl -s -S -I http://localhost:3000/auth/logout | grep HTTP/1.1
echo ''

echo 'GET /auth/login/facebook (should return 302 as redirects to facebook)'
curl -s -S -I http://localhost:3000/auth/login/facebook | grep HTTP/1.1
echo ''

echo 'GET /auth/login/facebook/callback (should return 302 as redirects to facebook)'
curl -s -S -I http://localhost:3000/auth/login/facebook/callback | grep HTTP/1.1
echo ''

echo 'GET /cart/ (should return 302 as not logged in and redirects)'
curl -s -S -I http://localhost:3000/cart | grep HTTP/1.1
echo ''

echo 'GET /checkout/ (should return 302 as not logged in and redirects)'
curl -s -S -I http://localhost:3000/checkout | grep HTTP/1.1
echo ''

echo 'GET /products/search (should return 400 as no search parameter)'
curl -s -S -I http://localhost:3000/products/search | grep HTTP/1.1
echo ''

echo 'GET /products/search?q= (should return 400 as no search parameter)'
curl -s -S -I http://localhost:3000/products/search?q= | grep HTTP/1.1
echo ''

echo 'GET /products/search?q=shoe (should return 200)'
curl -s -S -I http://localhost:3000/products/search?q=shoe | grep HTTP/1.1
echo ''

echo 'GET /orders (should return 200)'
curl -s -S -I http://localhost:3000/orders | grep HTTP/1.1
echo ''