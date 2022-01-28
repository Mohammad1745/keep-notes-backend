import Note from "App/Models/Note";
import ResponseService from "App/Services/ResponseService";

type typeNote = Note | null

export default class NoteService extends ResponseService {
  public async allNotes(httpContext) {
    try {
      let notes:Note[] = await Note.query()
        .where({ userId: httpContext.auth.user.id})
      return this.response(notes).success()
    } catch (e) {
      return this.response().error(e.message)
    }
  }

  public async store(httpContext) {
    try {
      let data = await httpContext.request.body()
      data.userId = httpContext.auth.user.id                                                       ////////////////
      let note:{} = await Note.create(data)
      return this.response(note).success()
    }
    catch (e) {
      return this.response().error(e.message)
    }
  }

  public async update(httpContext) {
    try {
      let id = httpContext.params['id']
      let data = await httpContext.request.body()
      await Note.query()
        .where({ id: id, userId: httpContext.auth.user.id})
        .update(data)
      return this.response().success('updated successfully')
    }
    catch (e) {
      return this.response().error(e.message)
    }
  }

  public async toggleFavourite(httpContext) {
    try {
      let id = httpContext.params['id']
      let note:typeNote = await Note.find(id)
      if (note){
        await Note.query()
          .where({ id: id, userId: httpContext.auth.user.id})
          .update({isFavourite: !note.isFavourite})
        return this.response().success()
      }
      else return this.response().error('Note not found')
    }
    catch (e) {
      return this.response().error(e.message)
    }
  }

  public async toggleTrashed(httpContext) {
    try {
      let id = httpContext.params['id']
      let note:typeNote = await Note.find(id)
      if (note){
        await Note.query()
          .where({ id: id, userId: httpContext.auth.user.id})
          .update({isTrashed: !note.isTrashed})
        return this.response().success()
      }
      else return this.response().error('Note not found')
    }
    catch (e) {
      return this.response().error(e.message)
    }
  }

  public async delete(httpContext) {
    try {
      let id = httpContext.params['id']
      await Note.query()
        .where({ id: id, userId: httpContext.auth.user.id})
        .delete()
      return this.response().success('Deleted successfully')
    }
    catch (e) {
      return this.response().error(e.message)
    }
  }
}
