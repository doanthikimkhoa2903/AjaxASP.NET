using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using QuetThe.Models;

namespace QuetThe.Controllers
{
    public class UserController : Controller
    {
        dbQuanliquetxeDataContext data = new dbQuanliquetxeDataContext();

       
        // GET: User
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult XemThongTin()
        {

            return View(data.TicketMonths.ToList()); 
        }
        public bool IsNumber(string pValue)
        {
            foreach (Char c in pValue)
            {
                if (!Char.IsDigit(c))
                    return false;
            }
            return true;
        }
        public ActionResult Search(string searchTeam)
        {
           
                var kh = from b in data.TicketMonths select b;

                if (!String.IsNullOrEmpty(searchTeam))
                {
                    if (IsNumber(searchTeam)==true)
                    {
                    kh = data.TicketMonths.Where(b => b.Stt.Equals(searchTeam));
                    }
                    else
                    kh = data.TicketMonths.Where(b => b.TenKH.Contains(searchTeam));
                   
                }
                ViewBag.SearchTerm = searchTeam;
                return View(kh.ToList());
            

        }
       
        public ActionResult NameUsing(string Name)
        {
            var Tenkh = data.TicketMonths.FirstOrDefault(d => d.ID ==Name);
            return View(Tenkh);
        }
       

        public ActionResult sua(string id)
        {

            SmartCard name = data.SmartCards.Single(p => p.ID == id);
            name.Using = false;
            UpdateModel(name);
            data.SubmitChanges();
            return RedirectToAction("XemThongTin");

        }
        public ActionResult chuyen(string id)
        {

            SmartCard name = data.SmartCards.Single(p => p.ID == id);
            TicketMonth name2 = data.TicketMonths.Single(p => p.ID == id);
            name2.IDPart = "6";
            name.Type = 6;         
            UpdateModel(name);
            UpdateModel(name2);
            data.SubmitChanges();
            return RedirectToAction("XemThongTin");

        }
        public ActionResult doiten(string id, FormCollection collection)
        {
            TicketMonth name = data.TicketMonths.Single(p => p.ID == id);
                string   newname = collection["txtName"];
                    name.TenKH = newname;
                    UpdateModel(name);
                    data.SubmitChanges();
                    return RedirectToAction("XemThongTin");
           
        }
        [HttpGet]
        public ActionResult them()
        {
            return View();

        }
        [HttpPost]
        [ValidateInput(false)]
        public ActionResult them(TicketMonth tiket)
        {
          
            data.TicketMonths.InsertOnSubmit(tiket);
            data.SubmitChanges();
            return RedirectToAction("XemThongTin");
        }





        [HttpGet]
        public JsonResult GetJsonData()
        {
            Random r = new Random();
            var list = new List<TicketMonth>();
            list = data.TicketMonths.ToList();
            return Json(list, JsonRequestBehavior.AllowGet);
        }
        
        [HttpPost]
        public JsonResult ChangeStatus(string id)
        {
            var name = data.TicketMonths.Single(p => p.ID == id);
            if(name != null)
            {
                if(name.Status == 1)
                {
                    name.Status = 0;
                }
                else
                {
                    name.Status = 1;
                }
                UpdateModel(name);
                data.SubmitChanges();

                return Json(new
                {
                    status = name.Status
                });
            }
            return Json(new
            {
                status = 0
            });
        }
        [HttpPost]
        public JsonResult CatThe(string id)
        {
            var name = data.SmartCards.Single(p => p.ID == id);
            if (name != null)
            {
                if (name.Using)
                {
                    name.Using = false;
                }
                else
                {
                    name.Using = true;
                }
                UpdateModel(name);
                data.SubmitChanges();

                return Json(new
                {
                    status = name.Using
                });
            }
            return Json(new
            {
                status = false
            });
        }

        [HttpPost]
        public JsonResult ChuyenThe(string id)
        {
            var name = data.SmartCards.Single(p => p.ID == id);
            var nametik = data.TicketMonths.Single(p => p.ID == id);
            if (nametik != null)
            {
                if (name.Type == 5)
                {
                    name.Type = 6;
                    nametik.IDPart = "6";
                }
                else
                {
                    name.Type = 5;
                    nametik.IDPart = "5";
                }
                
                UpdateModel(name);
                UpdateModel(nametik);
                data.SubmitChanges();

                return Json(new
                {
                    type = name.Type,
                    value=nametik.IDPart
                });
            }
            return Json(new
            {
                type = 5
            });
        }

        [HttpPost]
        public JsonResult SuaTen(string id, string name)
        {
            var objname = data.TicketMonths.Single(p => p.ID == id);
            if (name != null)
            {
                objname.TenKH = name;
                UpdateModel(name);
                data.SubmitChanges();

                return Json(new
                {
                    type = objname.TenKH
                });
            }
            return Json(new
            {
                type = ""
            });
        }
    }
}