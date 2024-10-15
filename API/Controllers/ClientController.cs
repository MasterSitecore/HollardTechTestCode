using System;
using System.Threading.Tasks;
using MediatR;
using HollardTechTestApi.Modules.Users.Commands;
using HollardTechTestApi.Modules.Users.Dtos;
using HollardTechTestApi.Modules.Users.Queries;
using Microsoft.AspNetCore.Mvc;

namespace HollardTechTestApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ClientController : ControllerBase // Renamed for clarity
    {
        private readonly IMediator _mediator;

        public ClientController(IMediator mediator) => _mediator = mediator;

        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] CreateUserDto userDto) // Added [FromBody]
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var command = new CreateUserCommand(userDto);
            var result = await _mediator.Send(command);
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserById(Guid id)
        {
            var query = new GetUserByIdQuery(id);
            var user = await _mediator.Send(query);

            if (user != null)
            {
                return Ok(user);
            }
            else
            {
                return NotFound("User not found");
            }
        }

        [HttpPost("login")]
        public async Task<IActionResult> LoginUser(SignInDto loginDto)
        {
            var query = new LoginUserCommand(loginDto);
            var user = await _mediator.Send(query);

            if (user != null)
            {
                return Ok(user);
            }
            else
            {
                return Unauthorized("Invalid email or password"); // Improved feedback
            }
        }

        [HttpPut]
        public async Task<IActionResult> UpdateClientDetails(UpdateUserDto updateUserDto)
        {
            var command = new UpdateUserCommand(updateUserDto);
            var result = await _mediator.Send(command);

            if (result != null)
            {
                return Ok(result);
            }

            return NotFound("User not found");
        }
    }
}
