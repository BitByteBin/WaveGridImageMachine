<a name="readme-top"></a>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/0xStabby/WaveGridImageMachine">
    <img src="images/BitDrop.gif" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">WaveGridImageMachine</h3>

  <p align="center">
    Simple Application for Saving p5.js canvas animations to file for a collection of seeds.
    <br />
    Useful for making generative algo art.
    <br />
    <a href="https://github.com/0xStabby/WaveGridImageMachine"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/0xStabby/WaveGridImageMachine">View Demo</a>
    ·
    <a href="https://github.com/0xStabby/WaveGridImageMachine/issues">Report Bug</a>
    ·
    <a href="https://github.com/0xStabby/WaveGridImageMachine/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![BitDrop][BitDrop-example]](https://github.com/0xStabby/WaveGridImageMachine)
<br/>
_example BitDrop generated from the WaveGridImageMachine_
<br/>
<br/>

Built this application in order to produce BitDrops (a Generative Algo Art collection).

Pretty simple application, but built so that you can:
1. Program animations in the canvas using p5.js
2. Save animation frames to file to be used to make gif/mp4/etc..
3. Input an array of seeds 
4. Do step number 2 for each seed

Currently it reads seeds from the bin-list.json file.

_(BitDrops used the seeds from Bins, a previous collection of randomly generated bits). Any seeds could be used tho._

<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* [![p5.js][p5.js]][p5.js-url]
* [![DotNet][DotNet.com]][DotNet-url]
* [![Bootstrap][Bootstrap.com]][Bootstrap-url]
* [![JQuery][JQuery.com]][JQuery-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

You must have dotnet 5.0 setup
* check dotnet versions with
  ```sh
  dotnet --version
  ```
_for installation instructions see [DotNet installation](https://learn.microsoft.com/en-gb/dotnet/core/install/)_

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/0xStabby/WaveGridImageMachine.git
   ```
2. Build and Run
   ```sh
   dotnet run
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

WaveGridImageMachine in action:
[![WaveGridImageMachine][WaveGridImageMachine-screenshot]](https://github.com/0xStabby/WaveGridImageMachine)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap

- [x] Program animations in the canvas using p5.js
- [x] Save animation frames to file to be used to make gif/mp4/etc..
- [x] Input an array of seeds 
- [x] Do step number 2 for each seed
- [ ] Generalize to make switching out algorithms as simple as adding a file and changing a variable

See the [open issues](https://github.com/0xStabby/WaveGridImageMachine/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Twitter: [@0xStabby](https://twitter.com/0xStabby)

Project Link: [https://github.com/0xStabby/WaveGridImageMachine](https://github.com/0xStabby/WaveGridImageMachine)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/0xStabby/WaveGridImageMachine.svg?style=for-the-badge
[contributors-url]: https://github.com/0xStabby/WaveGridImageMachine/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/0xStabby/WaveGridImageMachine.svg?style=for-the-badge
[forks-url]: https://github.com/0xStabby/WaveGridImageMachine/network/members
[stars-shield]: https://img.shields.io/github/stars/0xStabby/WaveGridImageMachine.svg?style=for-the-badge
[stars-url]: https://github.com/0xStabby/WaveGridImageMachine/stargazers
[issues-shield]: https://img.shields.io/github/issues/0xStabby/WaveGridImageMachine.svg?style=for-the-badge
[issues-url]: https://github.com/0xStabby/WaveGridImageMachine/issues
[license-shield]: https://img.shields.io/github/license/0xStabby/WaveGridImageMachine.svg?style=for-the-badge
[license-url]: https://github.com/0xStabby/WaveGridImageMachine/blob/master/LICENSE.txt
[BitDrop-example]: images/BitDrop2.gif
[WaveGridImageMachine-screenshot]: images/WaveGridImageMachine.png
[DotNet.Com]: https://img.shields.io/badge/DotNet-5.0-brightgreen?style=for-the-badge
[DotNet-url]: https://dotnet.microsoft.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[p5.js-url]: https://p5js.org/
[p5.js]: https://img.shields.io/static/v1?style=for-the-badge&message=p5.js&color=ED225D&logo=p5.js&logoColor=FFFFFF&label=
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com 
