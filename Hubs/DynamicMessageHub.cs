using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using xSignalRng6.Models;

namespace xSignalRng6.Hubs
{
    public class DynamicMessageHub : DynamicHub
    {
        public async Task SendMessage(NotifyMessage message)
        {
            await Clients.All.Send(message);
        }
    }
}
