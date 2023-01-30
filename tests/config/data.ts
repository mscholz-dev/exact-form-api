import CookieClass from "../../src/utils/Cookie.js";

// types
import { TCookie } from "../../src/utils/type";

// classes
const Cookie = new CookieClass();

const data = {
  username: "mscholz.dev",
  email: "mscholz.dev@gmail.com",
  lastName: "Scholz",
  firstName: "Morgan",
  phone: "0649495137",
  password: "Azerty5!",
  message: "Je suis un message",
  localeFr: "fr",
  localeEn: "en",
  client: "CLIENT",
  string61:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit odio.",
  string256:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris in leo in nisi lobortis commodo. Sed pretium ex ac turpis auctor condimentum. Morbi posuere ligula vel varius convallis. Morbi id aliquet augue. Vestibulum ante ipsum primis in faucibus augue.",
  string10_001:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec porta placerat tristique. Pellentesque blandit erat ac lorem hendrerit tempus. Aliquam id molestie tellus. Donec est est, malesuada id purus at, lacinia sodales augue. Curabitur ante odio, laoreet ac erat sit amet, ornare cursus augue. Sed risus risus, tincidunt a mauris sed, sagittis iaculis eros. Nullam eu sodales mi, eu facilisis felis. Integer facilisis sit amet nibh sit amet posuere. Cras ut risus eu lectus porta lobortis non vel lorem. Integer euismod dui eu dui fringilla, a porttitor libero porttitor. Etiam gravida quam sit amet metus blandit, vitae convallis tellus varius. Cras lacinia ante ut pulvinar rutrum. Duis est dolor, commodo eu eleifend et, lobortis eget tellus. Nulla vitae nisl justo. In cursus sed quam sit amet ornare. Nullam placerat est lorem, et suscipit eros placerat et. Proin ac orci non ante laoreet tincidunt. Ut feugiat leo at fermentum volutpat. Duis porta, ex quis dapibus luctus, augue mauris ultrices diam, et pulvinar odio risus nec velit. Ut molestie rhoncus laoreet. Phasellus cursus, risus non commodo lacinia, ex dui feugiat est, tincidunt imperdiet nunc velit vel arcu. Sed vitae libero quis velit elementum porttitor quis a orci. Phasellus ut ex eget dolor blandit aliquet vitae in sapien. Etiam nec ligula sed ligula cursus varius ut id libero. Integer vitae metus sodales, imperdiet risus a, lobortis mi. Donec semper imperdiet lectus non molestie. Cras et ante ac nunc gravida laoreet. Nulla aliquet elementum mi ut maximus. Donec ornare sapien sit amet sodales blandit. Donec suscipit, lorem vel laoreet placerat, mi neque rhoncus libero, sit amet molestie neque augue sit amet eros. Aenean leo sem, interdum ac dolor et, pulvinar gravida tortor. Morbi eu orci facilisis, pharetra arcu quis, volutpat nunc. Quisque cursus non mauris at mollis. Morbi finibus enim non nisl gravida tincidunt. Pellentesque condimentum justo eget libero pulvinar, nec scelerisque est auctor. Nulla vitae scelerisque nisi. Duis ante nisi, finibus a libero vel, rhoncus varius sem. Aliquam ultrices odio sit amet mi semper posuere. In volutpat nisl orci, quis sollicitudin diam dignissim a.Nam tincidunt vitae risus convallis pretium. Vestibulum ut rhoncus est. Nunc in tempus urna. Morbi nec orci ultrices, faucibus lorem ut, sagittis risus. Donec non ipsum sodales, consequat metus sed, blandit urna. Nunc massa mi, posuere at magna at, dignissim varius libero. Duis placerat lobortis ultricies. Duis porta turpis sed elit porta, a aliquet enim dignissim. Quisque luctus ullamcorper lectus, pulvinar facilisis mauris laoreet vitae.Sed magna dolor, auctor nec erat id, laoreet euismod nisl. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Etiam molestie metus vitae justo pulvinar, ac hendrerit odio commodo. Integer odio turpis, mollis ac dui eu, volutpat lacinia tortor. Cras pharetra iaculis erat, vitae finibus metus placerat id. Nulla tincidunt tincidunt metus nec cursus. Quisque semper sapien ac semper mattis. Maecenas interdum euismod ante sed porta. Suspendisse potenti. Quisque elementum tellus sed arcu maximus varius. Nunc non nisi suscipit lorem blandit rutrum. Nunc sed ex quis ex mattis viverra ut a tortor. In accumsan urna non est finibus fermentum. Pellentesque condimentum odio mi, nec lobortis nulla sollicitudin vitae. Praesent non felis viverra, volutpat ipsum pulvinar, imperdiet lacus. Mauris bibendum dictum leo non vehicula.Vivamus vestibulum malesuada quam non imperdiet. Proin id purus ornare, cursus eros id, rutrum erat. Donec non nisl interdum, euismod sapien vitae, accumsan mauris. Curabitur quis mi purus. In hac habitasse platea dictumst. Etiam at tincidunt erat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut nec aliquam ex.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque odio enim, condimentum in dapibus sit amet, ultricies in ex. Nam non bibendum tellus. Phasellus elit nisl, viverra vitae pulvinar id, mattis id ligula. Aenean quis consequat mi. Curabitur luctus auctor justo convallis venenatis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam varius sagittis justo sit amet euismod. Pellentesque sed urna mollis, tempor nulla pharetra, imperdiet quam. Curabitur finibus vulputate quam eget euismod. Morbi vitae venenatis justo, vel tincidunt eros. Cras vehicula mi quis sollicitudin tempus. Nulla fermentum mauris nec eros finibus eleifend. Sed convallis vitae eros eu eleifend. Duis auctor lorem eget mauris iaculis faucibus eget nec eros.Sed lobortis tellus non volutpat lobortis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sagittis felis ligula, non feugiat odio gravida id. Pellentesque lacinia, diam eu malesuada egestas, massa nisi blandit risus, sit amet fermentum ex neque nec purus. Fusce ligula elit, consequat ac diam et, fermentum accumsan dui. Sed vulputate nisl quis erat hendrerit, finibus fringilla metus scelerisque. Vestibulum ac metus molestie, pellentesque dui a, viverra neque. Phasellus aliquet ultrices malesuada. Pellentesque aliquet, est ac vulputate tincidunt, augue risus auctor est, ut accumsan dolor augue id odio. Integer rhoncus velit sed eros iaculis, sit amet vulputate lectus ultrices. Nulla est orci, mollis quis neque nec, euismod finibus sapien. Proin pretium eros et erat malesuada, vel egestas quam bibendum.Morbi vestibulum id libero eleifend auctor. Maecenas tincidunt nec sem id auctor. Praesent elementum dictum purus, euismod rutrum felis posuere vitae. Praesent vel nisi et nulla ultrices fermentum. Nam sed lacus malesuada neque efficitur cursus et ullamcorper augue. Sed felis justo, maximus et consequat ac, blandit eget nisi. Sed condimentum, ipsum et tempor laoreet, lectus erat finibus sem, et maximus sem nunc vel sapien. Aliquam venenatis iaculis nibh non porta. Donec varius nunc felis, quis malesuada sapien convallis ut. Etiam consequat consectetur diam. Nam dignissim risus eu urna porttitor aliquam. Sed viverra vitae dui nec porttitor. Nam lorem quam, vulputate tempor sapien sed, sodales pulvinar lectus.Vestibulum vehicula imperdiet erat. Cras lacus mauris, mattis sagittis mauris sed, aliquet tempor nisl. Nunc vel pharetra orci, non rutrum quam. Vivamus cursus arcu non enim faucibus suscipit id et urna. Aliquam odio ligula, viverra et lacus at, pretium tristique lectus. Nunc non neque elementum, interdum turpis in, rhoncus eros. Vivamus hendrerit libero libero, ut consequat tellus condimentum tristique. Nulla non egestas neque.Sed at justo ornare, volutpat turpis non, imperdiet augue. Nullam pellentesque, nunc ut pretium pharetra, purus arcu aliquam mauris, sit amet pharetra mi sapien sed dolor. Curabitur vehicula justo in justo consequat porttitor. Duis elementum hendrerit efficitur. Morbi vitae elementum lorem, vel dictum purus. Interdum et malesuada fames ac ante ipsum primis in faucibus. Etiam pretium congue ante, facilisis tincidunt justo volutpat sit amet. Sed laoreet leo metus, vitae varius orci laoreet a. Nulla iaculis urna vitae eros sodales, et porta massa laoreet. Ut ultricies fermentum hendrerit. Vivamus at placerat mauris. Mauris malesuada nunc ut eleifend vestibulum. Sed eu risus scelerisque, pulvinar nulla et, dapibus elit. Duis purus neque, pellentesque eu sollicitudin at, commodo non eros. Aenean tempor auctor arcu, sit amet tempus dui pretium at.Aenean ullamcorper ut orci ut auctor. Morbi in leo vitae odio fermentum pulvinar quis ut nibh. Aliquam vulputate nulla at mauris porta ornare. Maecenas auctor mauris id ligula tristique accumsan. Suspendisse vehicula egestas velit a ultrices. Etiam consectetur leo ante, sollicitudin posuere urna efficitur eu. Pellentesque et erat vitae nibh porttitor semper et id ante. Donec faucibus vel tellus sit amet fringilla. Donec in ultrices ante, ut tincidunt turpis.Integer interdum, risus eget semper viverra, nunc est sagittis erat, in tincidunt sapien sem a mauris. In magna ipsum, dictum eu gravida sed, varius at leo. Cras rhoncus est vel placerat vehicula. Fusce in accumsan odio. Aliquam sagittis ex ut pharetra mollis. Nam et sapien in dolor tempus fermentum sit amet ut ante. Vivamus ex leo, semper ut purus iaculis, suscipit blandit enim. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed rhoncus viverra aliquet.Aenean blandit a augue sit amet vulputate. Mauris et libero eget arcu faucibus ultricies ut nec quam. Donec a volutpat tortor. Donec non nunc ut felis consequat commodo eget et ipsum. Aliquam est tortor, dictum a orci a, cursus dignissim enim. Integer turpis est, vehicula eu sapien dictum, sollicitudin varius ligula. Fusce vehicula egestas rutrum.Proin tincidunt vehicula mi, vitae consectetur metus aliquam in. Duis vel turpis facilisis ex malesuada bibendum non porttitor sapien. Ut rhoncus sapien sit amet sem maximus posuere. Proin ante arcu, mattis vitae lacus at, rhoncus rutrum neque. Suspendisse commodo sapien id nulla gravida, et mollis mauris rutrum. Aliquam rutrum nisi sed quam vehicula, ac congue quam hendrerit. Nam interdum faucibus mauris, nec egestas neque commodo nec. Fusce et posuere eros. Ut condimentum nibh et nulla rhoncus, in ultrices augue convallis. Vestibulum porttitor nisl libero. Aenean feugiat mauris sit amet sem condimentum, sit amet efficitur metus iaculis. Fusce nisi turpis, ullamcorper in sem eget, convallis rhoncus nulla. Nullam molestie bibendum lectus, eu condimentum elit ullamcorper ac.Aliquam elementum, erat at dapibus pellentesque, ipsum mauris consequat magna, quis placerat ipsum leo nec nisi. Sed ultricies vulputate varius. Nulla tempor, lacus eu rhoncus ultricies, felis tellus ornare massa, ut mollis est turpis id nibh. Suspendisse ex erat, pellentesque vel pretium ac, consequat a mauris. Aenean eleifend sed metus in rhoncus. Quisque sodales, ligula ut eleifend sollicitudin, ipsum lorem mollis purus, sed luctus nibh erat vel libero. Fusce sit",
};

const randomUserJwt = Cookie.signJwt({
  username: data.username,
  email: "random email",
  role: data.client,
} as TCookie);

const validFrJwt = Cookie.signJwt({
  username: data.username,
  email: data.email,
  role: data.client,
} as TCookie);

const validFrUpdateOneJwt = Cookie.signJwt({
  username: `fr.${data.username}`,
  email: data.email,
  role: data.client,
} as TCookie);

const validFrUpdateTwoJwt = Cookie.signJwt({
  username: `fr2.${data.username}`,
  email: data.email,
  role: data.client,
} as TCookie);

const validEnJwt = Cookie.signJwt({
  username: `en.${data.username}`,
  email: `en.${data.email}`,
  role: data.client,
} as TCookie);

export default {
  ...data,
  validFrJwt,
  validFrUpdateOneJwt,
  validFrUpdateTwoJwt,
  validEnJwt,
  randomUserJwt,
};
