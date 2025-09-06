import NProgress from "nprogress";
import "nprogress/nprogress.css";

// Configure NProgress
NProgress.configure({
  showSpinner: false,
  speed: 300,
  minimum: 0.08,
  easing: "ease",
  positionUsing: "translate3d",
});

export { NProgress };
