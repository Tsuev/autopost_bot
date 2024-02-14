const axios = require('axios');

const generationPost = async (params) => {

  try { 
    const { data: { response } } = await axios.post('https://ask.chadgpt.ru/api/public/gpt-3.5', 
    {
      message: `
          Ты один из робот-админов канала AboutFrontned,
          Сгенерируй пост про любую фичу js, html или css на свой выбор, 
          объясни зачем она нужна и где можно посмотреть подробный пример,
          В заголовке должен быть соответствующий заголовок поста типа: <b>🤖Заголовок</b>.
          В конце поста сделай два раза перевод строки и напиши "#полезное #отробота"
          Важно примеры кода пиши следующим образом "<pre>Код</pre>"
        `,
      api_key: 'chad-7a56e1457c8a4d0180096fe52535a3e6yh7reeio'
    }) 

    return response;
  } catch (error) {
    console.log(error);
  }
}

module.exports = generationPost
