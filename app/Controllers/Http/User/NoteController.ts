import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import NoteService from "App/Services/NoteService";

export default class NoteController {
  private service

  constructor() {
    this.service = new NoteService()
  }

  public async index(httpContext: HttpContextContract): Promise<{ success: boolean; message: string; data: any }> {
    return await this.service.allNotes(httpContext)
  }

  public async store(httpContext: HttpContextContract): Promise<{ success: boolean; message: string; data: any }> {
    return await this.service.store(httpContext)
  }

  public async update(httpContext: HttpContextContract): Promise<{ success: boolean; message: string; data: any }> {
    return await this.service.update(httpContext)
  }

  public async toggleFavourite(httpContext: HttpContextContract): Promise<{ success: boolean; message: string; data: any }> {
    return await this.service.toggleFavourite(httpContext)
  }

  public async toggleTrashed(httpContext: HttpContextContract): Promise<{ success: boolean; message: string; data: any }> {
    return await this.service.toggleTrashed(httpContext)
  }

  public async delete(httpContext: HttpContextContract): Promise<{ success: boolean; message: string; data: any }> {
    return await this.service.delete(httpContext)
  }
}
