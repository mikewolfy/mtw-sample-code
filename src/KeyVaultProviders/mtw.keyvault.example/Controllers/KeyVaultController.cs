using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace mtw.keyvault.example.Controllers
{
    public class KeyVaultController : Controller
    {
        // GET: KeyVault
        public ActionResult Index()
        {
            return View();
        }

        // GET: KeyVault/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: KeyVault/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: KeyVault/Create
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create(IFormCollection collection)
        {
            try
            {
                // TODO: Add insert logic here

                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: KeyVault/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: KeyVault/Edit/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit(int id, IFormCollection collection)
        {
            try
            {
                // TODO: Add update logic here

                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }

        // GET: KeyVault/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: KeyVault/Delete/5
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Delete(int id, IFormCollection collection)
        {
            try
            {
                // TODO: Add delete logic here

                return RedirectToAction(nameof(Index));
            }
            catch
            {
                return View();
            }
        }
    }
}