## **InTaVia Story Viewer**

### **Description:**
The InTaVia Story Viewer offers a collection of stories curated using the Story Creator. 
´
### **Featured Stories:**
1. [Albrecht Dürer's Biography](https://intavia.fluxguide.com/fluxguide/public/content/fluxguide/exhibitions/1/system/app/dist/index.html?storyId=986)
2. [Pier Paolo Vergerio](https://intavia.fluxguide.com/fluxguide/public/content/fluxguide/exhibitions/1/system/app/dist/index.html?storyId=940)
3. [Die Baugeschichte der Wiener Hofburg vom Mittelalter bis zur Neuzeit](https://intavia.fluxguide.com/fluxguide/public/content/fluxguide/exhibitions/1/system/app/dist/index.html?storyId=960)
4. [Tuusula Lake Story](https://intavia.fluxguide.com/fluxguide/public/content/fluxguide/exhibitions/1/system/app/dist/index.html?storyId=993)
5. [Herwig Zens (1943-2019)](https://intavia.fluxguide.com/fluxguide/public/content/fluxguide/exhibitions/1/system/app/dist/index.html?storyId=1012)

### Installation

#### Prerequisites

Before you begin, make sure you have the following installed:

- **Git**: If you haven't installed Git yet, you can get it [here](https://git-scm.com/).
- **Node.js**: If not already installed, you can get it from [here](https://nodejs.org/).
- **Yarn**: If Node.js is installed, you can install Yarn using the command `npm install -g yarn`.

#### Installation Steps

1. **Clone the Repository**

   ```bash 
    git clone git@github.com:InTaVia/story-viewer.git        

2. **Navigate to the Repository Directory**
   ```bash 
    cd story-viewer 
3. **Install the Dependencies**
   ```bash 
    yarn install 
3. **Start the Development Server**
   ```bash 
    yarn run dev 
  This will start the development server, usually accessible at http://localhost:3000 or a similar URL.

4. **Building for Production**
   ```bash 
    yarn build
### **Usage Instructions:**
- **General Access:** View the complete collection of stories [here](https://intavia.fluxguide.com/fluxguide/app).
- **Self-hosting:** To host in your own environment, upload the content of the "app"-folder onto a webserver. For local hosting, consider tools like [Mamp](https://www.mamp.info/).
- **Custom Displays:**
  1. **Feature Specific Stories:** Use `http://localhost:8888/app/`
  2. **Single Story Display:** Add `storyId` parameter, e.g. `http://localhost:8888/app/?storyId=986`
  3. **Autostart a Story:** Simply add `autostart=1` parameter, e.g. `http://localhost:8888/app/?storyId=986&autostart=1`
  4. **Using local Story.json:** If you want to start the Story Viewer from a local story.json file on your computer (downloaded from Story Creator) you need to follow two steps:
  > - copy the content of your downloaded JSON-file in the the `localStory.json` file. 
  > - add `startLocalStory=1` parameter 


### **Technologies and Frameworks Used:**
- [VueJS](https://vuejs.org/): A popular JavaScript framework.
- [D3js](https://d3js.org/): Employed for timeline and network visualizations.
- [MapLibre](https://maplibre.org/): Powers all map-based visualizations.

## License

This software is licensed under the Non-Profit Open Software License 3.0 (NPOSL-3.0).

### Overview of the NPOSL-3.0:

- **Non-Commercial**: The NPOSL explicitly prohibits using the software for direct commercial advantage, making it ideal for projects that wish to limit for-profit use.
  
- **Derivative Works**: You can modify the software, but you must make your changes available under the same license.
  
- **Distribution**: You can distribute the software and your derivatives, but again, they must be under the NPOSL-3.0.

- **Attribution**: If you use the software, you must give appropriate credit.

For the full license text and further details, please refer to the [NPOSL-3.0 license](https://opensource.org/licenses/NPOSL-3.0).
