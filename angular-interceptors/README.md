# Angular — Interceptors

Projeto desenvolvido com Angular CLI e componentes standalone.

## Requisitos
- Node.js 20.19+ (ou versão compatível com Angular 20)
- npm

## Executar no VS Code
1. Extraia o arquivo ZIP.
2. Abra a pasta `angular-interceptors` no VS Code.
3. Abra o terminal integrado nessa pasta.
4. Execute:

```bash
npm install
npm start
```

A aplicação abrirá em `http://localhost:4200`.

## Login de demonstração
- Usuário: `emilys`
- Senha: `emilyspass`

A autenticação usa DummyJSON. O perfil protegido usa `/auth/me` e o CEP usa ViaCEP.
O interceptor de autenticação só envia `Authorization: Bearer ...` para a API DummyJSON,
nunca para o ViaCEP. O interceptor de erro encerra a sessão e redireciona para `/entrar`
quando a API retorna HTTP 401.

## Teste rápido
1. Entre com as credenciais acima.
2. Confira os dados do perfil.
3. Busque o CEP `40140-110`.
4. Para testar o tratamento de 401, abra o console do navegador e execute
   `localStorage.setItem('token', 'inventado')`; depois atualize a página.
