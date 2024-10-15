using System;
using System.ComponentModel.DataAnnotations;

namespace HollardTechTestApi.Modules.Users.Dtos
{
        public class CreateUserDto
        {

        [Required(ErrorMessage = "Title is required")]
        public string Title { get; set; }

        [Required(ErrorMessage = "Name is required")]
        [StringLength(50, ErrorMessage = "Name cannot be longer than 50 characters")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Surname is required")]
        [StringLength(50, ErrorMessage = "Surname cannot be longer than 50 characters")]
        public string Surname { get; set; }

        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid email address format")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Password is required")]
        [StringLength(100, MinimumLength = 6, ErrorMessage = "Password must be at least 6 characters long")]
        public string Password { get; set; }

    }
}

