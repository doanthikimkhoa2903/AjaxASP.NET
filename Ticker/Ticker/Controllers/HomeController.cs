using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Ticker.Models;

namespace Ticker.Controllers
{
    public class HomeController : Controller
    {
        TicketMonthsModalDataContext db = new TicketMonthsModalDataContext();
        public ActionResult Index()
        {
         
            return View();
        }

        public JsonResult List()
        {
            return Json(db.TicketMonths.ToList(), JsonRequestBehavior.AllowGet);
        }
        public JsonResult Get(string ID)
        {
            var ticketMonth = db.TicketMonths.ToList().Find(x => x.ID.Equals(ID));
            return Json(ticketMonth, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Create(TicketMonth entity)
        {

            db.TicketMonths.InsertOnSubmit(entity);
           
            db.SubmitChanges();
            var rs = "Insert Successfully";
            return Json(new { msg = rs }, JsonRequestBehavior.AllowGet);

        }

        public JsonResult Update(TicketMonth entity)
        {
            TicketMonth user = db.TicketMonths.ToList().Find(x => x.ID.Equals(entity.ID));
            user.RowID = entity.RowID;
            user.ID = entity.ID;
            user.Stt = entity.Stt;
            user.ProcessDate = entity.ProcessDate;
            user.Digit = entity.Digit;
            user.Company = entity.Company;
            user.TenKH = entity.TenKH;
            user.CMND = entity.CMND;
            user.Email = entity.Email;
            user.Address = entity.Address;
            user.CarKind = entity.CarKind;
            user.DateStart = entity.DateStart;
            user.DateEnd = entity.DateEnd;
            user.Amount = entity.Amount;
            user.Account = entity.Account;
            user.ChargesAmount = entity.ChargesAmount;
            user.DayUnLimit = entity.DayUnLimit;
            user.Note = entity.Note;
            user.Images = entity.Images;
            user.IDPart = entity.IDPart;

            db.SubmitChanges();
            return Json(new { msg = user }, JsonRequestBehavior.AllowGet);

        }
        public JsonResult Delete(string ID)
        {
            var ticketMonth = db.TicketMonths.ToList().Find(x => x.ID.Equals(ID));
            db.TicketMonths.DeleteOnSubmit(ticketMonth);
            db.SubmitChanges();

            return Json(new { msg = ticketMonth }, JsonRequestBehavior.AllowGet);


        }
        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}