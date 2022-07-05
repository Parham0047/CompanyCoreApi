using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CompanyCoreApi.Models
{
    public class CompanyDBContext:DbContext
    {
        public CompanyDBContext(DbContextOptions<CompanyDBContext> options):base(options)
        {

        }
        public DbSet<Products> Products { get; set; }
        public DbSet<Employees> Employees { get; set; }
    }
}
