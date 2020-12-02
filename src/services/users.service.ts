import {UserModel} from '../models/UserModel';

class UsersService {
  private apiUrl = 'https://frontend-test.netbox.ru';

  public async getAllUsers(): Promise<any> {
    const response = await fetch(this.apiUrl);
    return response.json().then(data => {
      return this.convertToUsersArray(data);
    })
  }

  public updateUser(userData: UserModel): Promise<any> {
    return fetch(this.apiUrl + '?method=update&' + this.convertToQueryString(userData));
  }

  public deleteUser(userId: number): Promise<any> {
    return fetch(`${this.apiUrl}?method=delete&id=${userId}`);
  }

  private convertToUsersArray(data: any) {
    return data.reduce((acc: any[], cv: any[]) => {
      const nv = cv.reduce((ac, c) => {
        const {value, field} = c;
        const prop = field.toLowerCase().replace('-', '');
        ac[prop] = value;
        return ac;
      }, {});

      acc.push(nv);
      return acc;
    }, []);
  }

  private convertToQueryString(data: UserModel) {
    return Object.keys(data)
      // @ts-ignore
      .map(key => `${key}=${data[key]}`)
      .join('&');
  }
}

const userService = new UsersService();
export default userService;
