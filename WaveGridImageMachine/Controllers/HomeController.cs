using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using WaveGridImageMachine.Models;

namespace WaveGridImageMachine.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IActionResult Index(string Id)
        {
            var missedArray = new int[] {395, 522};
            if (string.IsNullOrEmpty(Id)) { Id = "0"; }
            var number = Convert.ToInt32(Id, 2);
            var val = missedArray.Where(x => x > number).Min();
            Id = Convert.ToString(val, 2);
            StreamReader sr = new("bin-list.json");
            string jsonString = sr.ReadToEnd();
            NFT[] array = JsonConvert.DeserializeObject<NFT[]>(jsonString);
            NFT model = Array.Find(array, p => p.Name.Split(" ").Last() == Id);

            return View(model);
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
