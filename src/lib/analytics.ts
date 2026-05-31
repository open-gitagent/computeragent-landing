// Mixpanel analytics — client-only. The project token is a public,
// client-side token (it ships in the browser bundle by design), so it's
// safe to commit. Override at build time with VITE_MIXPANEL_TOKEN.
const MIXPANEL_TOKEN =
  (import.meta.env.VITE_MIXPANEL_TOKEN as string | undefined) ??
  "e37982c0c5df10c38becaa932540a013";

// Official Mixpanel browser loader snippet (2.x), trimmed. Loads the SDK,
// initializes it, and tracks the initial page view. Runs once, browser-only.
export function initMixpanel(): void {
  if (typeof window === "undefined") return; // SSR guard
  if ((window as unknown as { __mp_init?: boolean }).__mp_init) return;
  (window as unknown as { __mp_init?: boolean }).__mp_init = true;

  /* eslint-disable */
  // prettier-ignore
  (function(f:any,b:any){if(!b.__SV){var e,g,i,h;window.mixpanel=b;b._i=[];b.init=function(e:any,f:any,c:any){function g(a:any,d:any){var b=d.split(".");2==b.length&&(a=a[b[0]],d=b[1]);a[d]=function(){a.push([d].concat(Array.prototype.slice.call(arguments,0)))}}var a=b;"undefined"!==typeof c?a=b[c]=[]:c="mixpanel";a.people=a.people||[];a.toString=function(a:any){var d="mixpanel";"mixpanel"!==c&&(d+="."+c);a||(d+=" (stub)");return d};a.people.toString=function(){return a.toString(1)+".people (stub)"};i="disable time_event track track_pageview track_links track_forms track_with_groups add_group set_group remove_group register register_once alias unregister identify name_tag set_config reset opt_in_tracking opt_out_tracking has_opted_in_tracking has_opted_out_tracking clear_opt_in_out_tracking start_batch_senders people.set people.set_once people.unset people.increment people.append people.union people.track_charge people.clear_charges people.delete_user people.remove".split(" ");for(h=0;h<i.length;h++)g(a,i[h]);var j="set set_once union unset remove delete".split(" ");a.get_group=function(){function b(c:any){d[c]=function(){call2_args=arguments;call2=[c].concat(Array.prototype.slice.call(call2_args,0));a.push([e,call2])}}for(var d={},e=["get_group"].concat(Array.prototype.slice.call(arguments,0)),c=0;c<j.length;c++)b(j[c]);return d};b._i.push([e,f,c])};b.__SV=1.2;e=f.createElement("script");e.type="text/javascript";e.async=!0;e.src="undefined"!==typeof MIXPANEL_CUSTOM_LIB_URL?MIXPANEL_CUSTOM_LIB_URL:"file:"===f.location.protocol&&"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js".match(/^\/\//)?"https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js":"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js";g=f.getElementsByTagName("script")[0];g.parentNode.insertBefore(e,g)}})(document,(window as any).mixpanel||[]);
  /* eslint-enable */

  const mp = (window as unknown as { mixpanel: any }).mixpanel;
  mp.init(MIXPANEL_TOKEN, {
    track_pageview: true,
    persistence: "localStorage",
    ignore_dnt: false,
  });
}

// Fire a named event from anywhere in the app.
export function track(event: string, props?: Record<string, unknown>): void {
  if (typeof window === "undefined") return;
  const mp = (window as unknown as { mixpanel?: any }).mixpanel;
  if (mp?.track) mp.track(event, props);
}
