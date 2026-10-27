import * as THREE from 'three';
import { type ArtTheme } from './page-themes';
export { artThemes, type ArtTheme } from './page-themes';

function shadeMoonGeometry(geometry: THREE.BufferGeometry, phase: number) {
  const normals = geometry.attributes.normal;
  const colors = geometry.attributes.color;
  const grain = geometry.attributes.lunarGrain;
  const sx = Math.sin(phase), sz = -Math.cos(phase);
  for (let i = 0; i < normals.count; i++) {
    const light = Math.max(0, normals.getX(i) * sx + normals.getZ(i) * sz);
    const value = (.055 + .945 * Math.pow(light, .55)) * grain.getX(i);
    colors.setXYZ(i, value * .92, value * .92, value * .88);
  }
  colors.needsUpdate = true;
}

// Original, symbolic astrology diagrams. These are not a calculated personal chart.
// Meanings and research references: ASTROLOGY_VISUAL_RESEARCH.md.
export function createPageArt(theme: ArtTheme) {
  const root = new THREE.Group();
  root.name = `Astrology-${theme}`;
  const brass = new THREE.MeshStandardMaterial({ color: '#eac987', metalness: .55, roughness: .36 });
  const pale = new THREE.MeshBasicMaterial({ color: '#eeddb8' });
  const ink = new THREE.MeshStandardMaterial({ color: '#101f38', metalness: .25, roughness: .65 });
  const blue = new THREE.MeshBasicMaterial({ color: '#87b5cb' });
  const rose = new THREE.MeshBasicMaterial({ color: '#d9a6a0' });

  function mesh(parent: THREE.Group, geometry: THREE.BufferGeometry, material: THREE.Material = brass, position = [0, 0, 0]) {
    const object = new THREE.Mesh(geometry, material);
    object.position.set(...position as [number, number, number]); parent.add(object); return object;
  }
  function stroke(parent: THREE.Group, coords: number[][], material: THREE.Material = brass, width = .012, closed = false) {
    const points = coords.map(([x, y, z = .06]) => new THREE.Vector3(x, y, z));
    if (closed) points.push(points[0].clone());
    const curve = new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0);
    return mesh(parent, new THREE.TubeGeometry(curve, Math.max(8, points.length * 5), width, 5, false), material);
  }
  function segment(parent: THREE.Group, a: number[], b: number[], material: THREE.Material = brass, width = .012) {
    return stroke(parent, [a, b], material, width);
  }
  function ring(parent: THREE.Group, radius: number, width = .018, z = 0, material: THREE.Material = brass) {
    return mesh(parent, new THREE.TorusGeometry(radius, width, 6, 128), material, [0, 0, z]);
  }
  function label(parent: THREE.Group, text: string, x: number, y: number, size = .15, color = '#ead6a7', z = .10) {
    if (typeof document === 'undefined') return;
    const canvas = document.createElement('canvas'); canvas.width = 768; canvas.height = 96;
    const context = canvas.getContext('2d'); if (!context) return;
    context.fillStyle = color; context.font = '500 48px Georgia, "DejaVu Sans", serif';
    context.textAlign = 'center'; context.textBaseline = 'middle'; context.fillText(text, 384, 50);
    const texture = new THREE.CanvasTexture(canvas); texture.colorSpace = THREE.SRGBColorSpace;
    const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true, depthWrite: false, side: THREE.DoubleSide });
    const object = mesh(parent, new THREE.PlaneGeometry(size * 8, size), material, [x, y, z]);
    object.name = `Label-${text}`; return object;
  }
  function dot(parent: THREE.Group, x: number, y: number, radius = .045, material: THREE.Material = pale, z = .12) {
    return mesh(parent, new THREE.SphereGeometry(radius, 12, 8), material, [x, y, z]);
  }
  function ticks(parent: THREE.Group, radius: number, count = 120, major = 10) {
    const positions: number[] = [];
    for (let i = 0; i < count; i++) {
      const angle = i * Math.PI * 2 / count;
      const inner = radius - (i % major === 0 ? .12 : .045);
      positions.push(Math.cos(angle) * inner, Math.sin(angle) * inner, .035, Math.cos(angle) * radius, Math.sin(angle) * radius, .035);
    }
    const geometry = new THREE.BufferGeometry(); geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    parent.add(new THREE.LineSegments(geometry, new THREE.LineBasicMaterial({ color: '#b99457', transparent: true, opacity: .8 })));
  }
  function dial(parent: THREE.Group, radius = 2.3, houses = true) {
    const chart = new THREE.Group(); chart.name = 'Twelve-sign-ecliptic'; parent.add(chart);
    const disc = mesh(chart, new THREE.CylinderGeometry(radius, radius, .055, 96), ink, [0, 0, -.07]); disc.rotation.x = Math.PI / 2;
    ring(chart, radius, .035); ring(chart, radius - .11, .009); ring(chart, radius - .5, .014); ticks(chart, radius - .15);
    const signs = ['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓'];
    for (let i = 0; i < 12; i++) {
      const a = Math.PI / 2 + i * Math.PI / 6;
      segment(chart, [Math.cos(a) * (radius - .5), Math.sin(a) * (radius - .5)], [Math.cos(a) * radius, Math.sin(a) * radius], brass, .007);
      label(chart, signs[i] + '\uFE0E', Math.cos(a + Math.PI / 12) * (radius - .32), Math.sin(a + Math.PI / 12) * (radius - .32), .19);
      if (houses) {
        const house = segment(chart, [Math.cos(a) * .5, Math.sin(a) * .5], [Math.cos(a) * (radius - .53), Math.sin(a) * (radius - .53)], brass, .005);
        house.name = `House-${i + 1}`;
        label(chart, String(i + 1).padStart(2, '0'), Math.cos(a + Math.PI / 12) * (radius - .79), Math.sin(a + Math.PI / 12) * (radius - .79), .10, '#b99c69');
      }
    }
    if (houses) ring(chart, .48, .008);
    return chart;
  }
  function aspect(parent: THREE.Group, a: number, b: number, radius: number, material: THREE.Material = blue) {
    const p = (angle: number) => [Math.cos(angle) * radius, Math.sin(angle) * radius, .09];
    segment(parent, p(a), p(b), material, .007); dot(parent, p(a)[0], p(a)[1], .04, material); dot(parent, p(b)[0], p(b)[1], .04, material);
  }
  function sun(parent: THREE.Group, radius = .3) {
    const group = new THREE.Group(); group.name = 'Surya-Sun'; parent.add(group);
    dot(group, 0, 0, radius, new THREE.MeshBasicMaterial({ color: '#edc47b' })); ring(group, radius * 1.3, .012, .13);
    for (let i = 0; i < 16; i++) {
      const a = i * Math.PI / 8;
      segment(group, [Math.cos(a) * radius * 1.6, Math.sin(a) * radius * 1.6, .1], [Math.cos(a) * radius * 1.95, Math.sin(a) * radius * 1.95, .1], brass, .01);
    }
    return group;
  }
  function moon(parent: THREE.Group, radius: number, phase: number, x = 0, y = 0) {
    // A shaded sphere with a phase terminator, rather than eight identical balls.
    const geometry = new THREE.SphereGeometry(radius, 56, 40);
    const normals = geometry.attributes.normal;
    const values: number[] = [];
    const light = new THREE.Vector3(Math.sin(phase), 0, -Math.cos(phase));
    for (let i = 0; i < normals.count; i++) {
      const normal = new THREE.Vector3().fromBufferAttribute(normals, i);
      const illumination = Math.max(0, normal.dot(light));
      const texture = .84 + .08 * Math.sin(normal.x * 39 + normal.y * 27) * Math.sin(normal.z * 29 - normal.y * 19) + .06 * Math.sin(normal.x * 73 + normal.z * 41);
      const intensity = (.055 + .945 * Math.pow(illumination, .55)) * texture;
      values.push(intensity * .92, intensity * .92, intensity * .88);
    }
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(values, 3));
    const grain = [];
    for (let i = 0; i < normals.count; i++) {
      const x = normals.getX(i), y = normals.getY(i), z = normals.getZ(i);
      grain.push(.84 + .08 * Math.sin(x * 39 + y * 27) * Math.sin(z * 29 - y * 19) + .06 * Math.sin(x * 73 + z * 41));
    }
    geometry.setAttribute('lunarGrain', new THREE.Float32BufferAttribute(grain, 1));
    const object = mesh(parent, geometry, new THREE.MeshBasicMaterial({ vertexColors: true }), [x, y, .18]); object.name = 'Chandra-Moon'; return object;
  }
  function pointer(parent: THREE.Group, radius: number, speed = .035, material: THREE.Material = brass) {
    const hand = new THREE.Group(); hand.name = 'Moving-transit-indicator'; hand.userData.motion = 'rotate'; hand.userData.speed = speed;
    segment(hand, [0, 0, .14], [radius, 0, .14], material, .011); dot(hand, radius, 0, .06, material, .15); parent.add(hand); return hand;
  }
  function kundli(parent: THREE.Group, size = 1.75) {
    const chart = new THREE.Group(); chart.name = 'North-Indian-kundli'; parent.add(chart);
    const s = size;
    mesh(chart, new THREE.BoxGeometry(s * 2 + .14, s * 2 + .14, .10), ink, [0, 0, -.08]);
    stroke(chart, [[-s, s], [s, s], [s, -s], [-s, -s]], brass, .025, true);
    stroke(chart, [[0, s], [s, 0], [0, -s], [-s, 0]], brass, .013, true);
    segment(chart, [-s, s], [s, -s]); segment(chart, [s, s], [-s, -s]);
    const positions = [[0, .65], [-.56, .88], [-.88, .56], [-.65, 0], [-.88, -.56], [-.56, -.88], [0, -.65], [.56, -.88], [.88, -.56], [.65, 0], [.88, .56], [.56, .88]];
    positions.forEach(([x, y], i) => label(chart, String(i + 1), x * s, y * s, .14));
    label(chart, 'LAGNA', 0, .3 * s, .10, '#8fb8c6');
    label(chart, '☉', -.34 * s, -.06 * s, .22); label(chart, '☽', .35 * s, -.13 * s, .22);
    return chart;
  }

  switch (theme) {
    case 'about': {
      const chart = kundli(root, 1.75); chart.rotation.z = -.04;
      label(root, 'JYOTISHA', 0, 2.25, .20); label(root, 'THE TWELVE HOUSES', 0, -2.3, .11, '#bca57b');
      const halo = ring(root, 2.65, .007, -.15); halo.rotation.y = .2;
      break;
    }
    case 'services': {
      dial(root, 2.5); aspect(root, .25, 2.35, 1.45); aspect(root, 2.35, 4.45, 1.45); aspect(root, 4.45, .25, 1.45);
      aspect(root, 1.15, 4.3, 1.2, rose); pointer(root, 2.02, .024);
      label(root, 'THE BIRTH CHART', 0, -.24, .13); label(root, 'LIFE · CONNECTION · DIRECTION', 0, -2.86, .10);
      break;
    }
    case 'how-it-works': {
      const chart = dial(root, 2.3); chart.name = 'Chart-constructed-from-time-and-place';
      // Fixed horizon + a moving zodiac indicator: the ascendant is an intersection,
      // not a row of floating objects.
      segment(root, [-2.85, 0, .2], [2.85, 0, .2], blue, .018);
      label(root, 'EAST', -2.66, .24, .10, '#aad2dd'); label(root, 'WEST', 2.65, .24, .10, '#aad2dd');
      dot(root, -2.3, 0, .10); label(root, 'ASC', -2.36, -.25, .12);
      pointer(root, 1.97, .035); label(root, 'TIME + PLACE → YOUR CHART', 0, -2.77, .11);
      break;
    }
    case 'reviews': {
      const a = new THREE.Group(); const b = new THREE.Group(); root.add(a, b);
      dial(a, 2, false); dial(b, 2, false); a.scale.setScalar(.78); b.scale.setScalar(.78);
      a.position.set(-.92, .35, 0); b.position.set(.92, -.35, .24);
      a.rotation.z = -.1; b.rotation.z = .1;
      aspect(a, .3, 2.45, 1.15, blue); aspect(b, 2.8, 4.8, 1.15, rose);
      const bridges = new THREE.Group(); bridges.name = 'Synastry-connections'; root.add(bridges);
      segment(bridges, [-1.55, .8, .5], [1.35, .4, .5], blue, .009);
      segment(bridges, [-.85, -.55, .5], [1.45, -.9, .5], rose, .009);
      label(root, 'TWO CHARTS · A CONVERSATION', 0, -2.55, .11);
      break;
    }
    case 'contact': {
      const chart = dial(root, 2.2, false); chart.rotation.x = .16;
      const meridian = ring(root, 2.55, .025); meridian.rotation.y = 1.03;
      const horizon = ring(root, 2.65, .022); horizon.rotation.x = 1.1;
      segment(root, [-2.65, 0], [2.65, 0], blue, .008); segment(root, [0, -2.65], [0, 2.65], blue, .008);
      label(root, 'N', 0, 2.9, .16); label(root, 'S', 0, -2.9, .16); label(root, 'E', -2.9, 0, .16); label(root, 'W', 2.9, 0, .16);
      label(root, 'THE LOCAL HORIZON', 0, -.3, .12); sun(root, .24); pointer(root, 1.82, .025); break;
    }
    case 'book': {
      const instrument = new THREE.Group(); instrument.name = 'Equatorial-sundial'; root.add(instrument);
      instrument.rotation.set(-.65, .15, -.18);
      dial(instrument, 2.4, false); ticks(instrument, 1.7, 60, 5); ring(instrument, 1.8, .016);
      // An upright gnomon standing above the graduated face, seen in perspective.
      // Inspired by the Samrat/Rasivalaya instruments, not an auspicious-time calculation.
      const shape = new THREE.Shape(); shape.moveTo(-.8, 0); shape.lineTo(.8, 0); shape.lineTo(.20, 1.65); shape.closePath();
      const gnomon = mesh(instrument, new THREE.ExtrudeGeometry(shape, { depth: .12, bevelEnabled: true, bevelSize: .025, bevelThickness: .025, bevelSegments: 2 }), brass, [0, 0, .10]);
      gnomon.rotation.x = Math.PI / 2; gnomon.name = 'Sundial-gnomon';
      segment(instrument, [-.95, -.08, .09], [.95, -.08, .09], brass, .035);
      const hand = pointer(instrument, 1.65, .025, blue); hand.rotation.z = .65;
      label(root, 'CHOOSING A MOMENT', 0, -2.6, .12); break;
    }
    case 'horoscope': {
      ring(root, 2.16, .008); ticks(root, 2.2, 120, 15);
      const phases = ['NEW', 'WAXING CRESCENT', 'FIRST QUARTER', 'WAXING GIBBOUS', 'FULL', 'WANING GIBBOUS', 'THIRD QUARTER', 'WANING CRESCENT'];
      for (let i = 0; i < 8; i++) {
        const a = Math.PI / 2 - i * Math.PI / 4;
        const x = 2.16 * Math.cos(a), y = 2.16 * Math.sin(a);
        moon(root, .31, i * Math.PI / 4, x, y);
        label(root, phases[i], x, y - .49, .075, '#c3b69a');
      }
      const changingMoon = moon(root, .83, Math.PI * .78); changingMoon.userData.phaseCycle = true; label(root, 'CHANDRA', 0, -1.16, .17);
      label(root, 'THE LUNAR CYCLE', 0, -2.98, .12); break;
    }
    case 'blog': {
      const folio = new THREE.Group(); folio.name = 'Celestial-manuscript'; root.add(folio);
      const paper = new THREE.MeshStandardMaterial({ color: '#bfa984', metalness: .1, roughness: .9 });
      mesh(folio, new THREE.BoxGeometry(5.1, 3.55, .14), ink, [0, 0, -.2]);
      mesh(folio, new THREE.BoxGeometry(2.4, 3.3, .055), paper, [-1.23, 0, -.08]);
      mesh(folio, new THREE.BoxGeometry(2.4, 3.3, .055), paper, [1.23, 0, -.08]);
      segment(folio, [0, -1.65], [0, 1.65], brass, .035);
      const chart = new THREE.Group(); folio.add(chart); chart.scale.setScalar(.46); chart.position.set(-1.23, .15, .05); dial(chart, 2.1);
      const right = new THREE.Group(); folio.add(right); right.position.set(1.23, .25, .05);
      moon(right, .48, Math.PI * .7); label(right, 'SUN · MOON · STARS', 0, -1.14, .09, '#28324b');
      for (let i = 0; i < 6; i++) segment(right, [-.75, -.5 - i * .07], [.75 - (i % 3) * .18, -.5 - i * .07], ink, .008);
      folio.rotation.z = -.045; label(root, 'NOTES FROM THE CELESTIAL TRADITION', 0, -2.25, .11); break;
    }
    case 'faq': {
      const ecliptic = ring(root, 2.25, .016); ecliptic.name = 'Ecliptic'; ticks(root, 2.28, 120, 10);
      const orbit = new THREE.Group(); orbit.name = 'Inclined-lunar-orbit'; orbit.rotation.x = .65; root.add(orbit); ring(orbit, 2.25, .016, 0, blue);
      for (const [x, name] of [[-2.25, 'RAHU'], [2.25, 'KETU']] as const) { dot(root, x, 0, .09); label(root, name, x, -.26, .12); }
      const earth = dot(root, 0, 0, .43, new THREE.MeshStandardMaterial({ color: '#356d88', roughness: .85 })); earth.name = 'Earth';
      const moving = new THREE.Group(); moving.userData.motion = 'rotate'; moving.userData.speed = .10; orbit.add(moving); moon(moving, .2, Math.PI * .75, 0, 2.25);
      label(root, 'THE LUNAR NODES', 0, -2.82, .13); label(root, 'WHERE TWO PATHS MEET', 0, -3.05, .08); break;
    }
    case 'privacy': {
      const chart = kundli(root, 1.48); chart.rotation.z = .035;
      const cover = new THREE.Group(); cover.name = 'Personal-chart-folio'; root.add(cover);
      stroke(cover, [[-1.9, -1.85], [1.9, -1.85], [1.9, 1.85], [-1.9, 1.85]], brass, .045, true);
      segment(cover, [-2.02, -1.85], [-2.02, 1.85], brass, .025);
      const seal = new THREE.Group(); root.add(seal); seal.position.set(1.7, -.85, .4); ring(seal, .28, .022); sun(seal, .11);
      label(root, 'A PERSONAL CHART', 0, 2.3, .15); label(root, 'HELD IN CONFIDENCE', 0, -2.3, .11); break;
    }
    case 'terms': {
      dial(root, 2.35, false);
      const stars = [[-1.3, .1], [-.45, .7], [.55, .35], [1.35, -.65], [-.5, -1.1]];
      [[0, 1], [1, 2], [2, 3], [0, 4], [4, 3]].forEach(([a, b]) => segment(root, stars[a], stars[b], blue, .012));
      stars.forEach(([x, y], i) => dot(root, x, y, i === 1 ? .095 : .06));
      label(root, '♎\uFE0E', 0, .03, .60); label(root, 'LIBRA · BALANCE & AGREEMENT', 0, -2.8, .11); break;
    }
    default: dial(root);
  }
  root.rotation.set(.07, -.10, 0);
  root.userData.theme = theme;
  return root;
}

export function animatePageArt(group: THREE.Group, elapsed: number) {
  // Keep diagrams readable. Animate the information-bearing indicators, not a
  // whole chart tumbling into an unreadable angle.
  group.rotation.y = -.10 + Math.sin(elapsed * .12) * .045;
  group.traverse(object => {
    if (object.userData.motion === 'rotate') object.rotation.z = elapsed * object.userData.speed;
    if (object instanceof THREE.Mesh && object.userData.phaseCycle) shadeMoonGeometry(object.geometry, Math.PI * .78 + elapsed * .13);
  });
}

export function disposePageArt(group: THREE.Group) {
  const materials = new Set<THREE.Material>(); const textures = new Set<THREE.Texture>();
  group.traverse(object => {
    if (object instanceof THREE.Mesh || object instanceof THREE.LineSegments) {
      object.geometry.dispose();
      (Array.isArray(object.material) ? object.material : [object.material]).forEach(material => {
        materials.add(material);
        const map = (material as THREE.MeshBasicMaterial).map; if (map) textures.add(map);
      });
    }
  });
  textures.forEach(texture => texture.dispose()); materials.forEach(material => material.dispose());
}
