using Microsoft.AspNetCore.Mvc;
using MediatR;
using Application.Profiles;
using API.Controllers;

namespace API.Controllers
{   
    public class ProfilesController : BaseApiController
    {
      
        [HttpGet("{username}")]
        public async Task<IActionResult> GetProfile(string username){
            return  HandleResult(await Mediator.Send(new Details.Query{Username =  username}));
        }


    }
}