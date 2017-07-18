using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace MVCLearningLib
{
    public class ControllerBase :IController
    {

        public IValueProvider ValueProvider
        {
            get
            {
                throw new System.NotImplementedException();
            }

            set
            {
            }
        }
    }
}