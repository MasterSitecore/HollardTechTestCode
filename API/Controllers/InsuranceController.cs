using MediatR;
using HollardTechTestApi.Modules.Users.Commands;
using HollardTechTestApi.Modules.Users.Dtos;
using HollardTechTestApi.Modules.Users.Queries;
using Microsoft.AspNetCore.Mvc;

namespace HollardTechTestApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class InsuranceController : ControllerBase
    {
        private readonly IMediator _mediator;
        public InsuranceController(IMediator mediator) => _mediator = mediator;


        [HttpPost]
        [Route("addUpdateRiskAndCover")]
        public async Task<IActionResult> AddUpdateRiskAndCover([FromBody]  RiskAndCovercsDto riskAndCovercsDto)
        {
            var command = new QuoteCommand(riskAndCovercsDto);
            var result = await _mediator.Send(command);
            return Ok(result);
        }
        [HttpGet]
        [Route("fetchQuote")]
        public async Task<IActionResult> GetQuote(Guid customerId)
        {
            var query = new GetQuoteByIdQuery(customerId);
            var quote = await _mediator.Send(query);

            if (quote != null)
            {
                return Ok(quote);
            }
            else
            {
                return NotFound();
            }
        }

        [HttpDelete]
        [Route("Quote")]
        public async Task<IActionResult> DeleteQuote(int quoteId)
        {
            var query = new DeleteQuoteByIdQuery(quoteId);
            var quote = await _mediator.Send(query);

            if (quote != null)
            {
                return Ok(quote);
            }
            else
            {
                return NotFound();
            }
        }
    }
    
}
