export default class  ResponseService {
  constructor() {
  }
  private res:{success:boolean, message:string, data:any} = {
    success : true,
    message : '',
    data : null
  }
  private errorMessage:string = 'Something went wrong! ';

  protected response (data:null|{}|[]=null) {
    this.res['data'] = data;
    return this;
  }

  success (message:null|string=null) {
    this.res['success'] = true;
    this.res['message'] = message ?
      message :
      'Done';
    return this.res;
  }

  error (message:null|string=null) {
    this.res['success'] = false;
    this.res['message'] = message ?
      message :
      this.errorMessage;
    return this.res;
  }
}
