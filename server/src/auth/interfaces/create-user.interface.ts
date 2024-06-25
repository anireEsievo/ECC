// interface to add user to the db
export interface CreateUser {
  user_name: string;

  hash: string;

  private_key: string;

  public_key: string;
}
