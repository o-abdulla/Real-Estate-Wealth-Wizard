﻿using FinalProject.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FinalProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PropertiesByPostalController : ControllerBase
    {
        //PropertiesByPostalModel _dbContext = new PropertiesByPostalModel();

        //api/PropertiesByPostal/12133
        [HttpGet("{postal_code}")]
        public PropertiesByPostalModel GetAllByPostalCode(string postal_code)
        {
            return PropertiesByPostalDAL.GetByPostalCode(postal_code);
        }
    }
}
