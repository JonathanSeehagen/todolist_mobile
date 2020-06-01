interface Response {
  token: string;
  user: {
    name: string;
    email: string;
  };
}

export function signIn(): Promise<Response> {
  return new Promise((resolve) => {
    //Simula que a API demorou 2 seg para responder
    setTimeout(() => {
      resolve({
        token: 'asdasdasdasdasdasdasd',
        user: {
          name: 'Jonathan',
          email: 'jonathan@seehagen.com.br',
        },
      });
    }, 2000);
  });
}
