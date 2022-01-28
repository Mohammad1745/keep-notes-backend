import Route from '@ioc:Adonis/Core/Route'

Route.get('/auth/google/redirect', 'User/AuthController.redirectToProvider')
Route.get('/google/callback', 'User/AuthController.handleProviderCallback')

