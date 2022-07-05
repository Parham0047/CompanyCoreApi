using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace CompanyCoreApi.Models
{
    public class Products
    {
        [Key]
        public int id { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string productName { get; set; }

        [Column(TypeName = "int")]
        public int productCode { get; set; }

    }
}
