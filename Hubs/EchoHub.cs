using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;


// https://passos.com.au/signalr-with-net-core-2-1-and-angular/

namespace xSignalRng6.Hubs
{
    public class EchoHub: Hub
    {
        //you're going to invoke this method from the client app
        public void Echo(string message)
        {
            //you're going to configure your client app to listen for this
            Clients.All.SendAsync("Send", message);
        }
    }
}
