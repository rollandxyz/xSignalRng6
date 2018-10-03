using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace xSignalRng6.Models
{
    public class NotifyMessage
    {
        public string user { get; set; }

        public string message { get; set; }

        public string room { get; set; }
    }
}
