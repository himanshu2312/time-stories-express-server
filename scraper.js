import { get } from 'https';
import { parse } from 'url';

export const getStories = async () => {
  const websiteUrl = 'https://time.com';
  const response = await fetchData(websiteUrl);
  // console.log("response:",response)

  // Extract latest 6 stories
  const stories = [];
  const storyElements = response.split('<li class="latest-stories__item">').slice(1, 7);
  
  for (const element of storyElements) {
    const title = element.split('</a>')[0].split('<h3 class="latest-stories__item-headline">')[1].split("</h3>")[0];
    const link = websiteUrl + element.split('href="')[1].split('"')[0];
    stories.push({ title, link });
  }
  
  // console.log("stories:",stories)
  return stories;
};

const fetchData = (url) => {
  return new Promise((resolve, reject) => {
    const options = parse(url);
    get(options, (response) => {
      let data = '';

      response.on('data', (chunk) => {
        data += chunk;
      });

      response.on('end', () => {
        resolve(data);
      });
    }).on('error', (error) => {
      reject(error);
    });
  });
};

