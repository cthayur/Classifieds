using System.Web;
using System.Web.Optimization;

namespace ClassifiedsV3
{
    public class BundleConfig
    {
        // For more information on Bundling, visit http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/app/jquery.unobtrusive*",
                        "~/Scripts/app/jquery.validate*"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                    "~/Content/bootstrap-responsive.css",
                    "~/Content/bootstrap.css",
                    "~/Content/Site.css",
                    "~/Content/toastr.css"));

            bundles.Add(new ScriptBundle("~/bundles/coreScripts").Include(
                    "~/Scripts/core/jquery-2.0.2.js",
                    "~/Scripts/core/jquery-ui-1.10.3.js",
                    "~/Scripts/core/knockout-2.2.1.js",
                    "~/Scripts/core/knockout.activity.js",
                    "~/Scripts/core/Path.js",
                    "~/Scripts/core/bootstrap.js",
                    "~/Scripts/core/toastr.js",
                    "~/Scripts/code/modernizr-2.6.2"));

            bundles.Add(new ScriptBundle("~/bundles/appScripts").Include(
                    "~/Scripts/app/vm.generic.js",
                    "~/Scripts/app/constants.js",
                    "~/Scripts/app/setUpViewModels.js",
                    "~/Scripts/app/models.js",
                    "~/Scripts/app/vm.message.js",
                    "~/Scripts/app/vm.viewPost.js",
                    "~/Scripts/app/vm.editPost.js",
                    "~/Scripts/app/eventHandlers.js",
                    "~/Scripts/app/vm.navbar.js",
                    "~/Scripts/app/vm.mixedbag.js",
                    "~/Scripts/app/vm.housing.js",
                    "~/Scripts/app/vm.messages.js",
                    "~/Scripts/app/vm.subscriptions.js",
                    "~/Scripts/app/vm.userPosts.js",
                    "~/Scripts/app/datastore.js",
                    "~/Scripts/app/vm.bindviewmodels.js",
                    "~/Scripts/app/routesRegistry.js",
                    "~/Scripts/app/kickoff.js"));

            BundleTable.EnableOptimizations = false;

        }
    }
}