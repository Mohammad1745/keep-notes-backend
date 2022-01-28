import Route from '@ioc:Adonis/Core/Route'


Route.group(()=> {
  Route.get('/', 'User/NoteController.index')
  Route.post('/', 'User/NoteController.store')
  Route.post('/:id', 'User/NoteController.update')
  Route.post('/:id/toggle-favourite', 'User/NoteController.toggleFavourite')
  Route.post('/:id/toggle-trashed', 'User/NoteController.toggleTrashed')
  Route.get('/:id/delete', 'User/NoteController.delete')
}).prefix('/api/note').middleware('auth:api')
