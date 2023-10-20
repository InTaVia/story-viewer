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

### **Technologies and Frameworks Used:**
- [VueJS](https://vuejs.org/): A popular JavaScript framework.
- [D3js](https://d3js.org/): Employed for timeline and network visualizations.
- [MapLibre](https://maplibre.org/): Powers all map-based visualizations.

### **License: MIT License**
Copyright © 2023, [Fluxguide Ausstellungssysteme GmbH](https://www.fluxguide.com/) (Design, UX, Development)

Permission is granted, free of charge, to any person obtaining a copy of this software and associated documentation (the "Software") to deal with the Software without restrictions. This includes rights to use, copy, modify, merge, publish, distribute, sublicense, and sell copies of the Software. Individuals to whom the Software is furnished have permission under the following conditions:

The provided copyright notice and permission notice must be included in all copies or significant portions of the Software.
The Software is given "AS IS", without any warranty. This includes, but is not limited to, warranties of merchantability or fitness for any particular purpose. The authors or copyright holders are not liable for any claims, damages, or other liabilities arising from the Software.
