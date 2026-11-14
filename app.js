(function () {
  'use strict';

  var TAGS = {
    reg: ['t-reg', "Regulator's record"],
    sworn: ['t-sworn', "Cohen's sworn words"],
    pub: ['t-pub', 'Public record cited'],
    alleg: ['t-alleg', 'Allegation']
  };
  function tag(k) { return '<span class="tag ' + TAGS[k][0] + '">' + TAGS[k][1] + '</span>'; }
  function $(id) { return document.getElementById(id); }

  /* ---------- At a glance ---------- */
  var cards = [
    { k: 'reg', big: '"Lacking in integrity"', head: "The Commissioner's written charge",
      body: 'The Insurance Commissioner alleged that the facts "show that Respondent is lacking in integrity," that he "has previously engaged in a fraudulent practice or act," and that he "has knowingly or willfully made a misstatement in an application to the Insurance Commissioner."',
      src: 'Statement of Issues, File No. LBB 4044-AP (AR), paragraphs V, VI, VIII' },
    { k: 'reg', big: '"No"', head: 'His answer when asked about convictions',
      body: 'Asked on his 2007 license application whether he had ever been convicted of a crime, Cohen answered "No." The Commissioner alleged: "Such answer was false and known to Respondent to be false."',
      src: 'Statement of Issues, paragraph III' },
    { k: 'reg', big: 'Theft', head: 'A 2000 misdemeanor conviction',
      body: 'According to the Statement of Issues, on or about June 13, 2000, in Santa Barbara County Superior Court Case No. 1012241, Cohen "was convicted upon a plea of nolo contendere of theft, a misdemeanor."',
      src: 'Statement of Issues, paragraph II' },
    { k: 'pub', big: '$45,981', head: 'Federal tax lien',
      body: 'On May 12, 2015, the United States recorded a $45,981 federal tax lien against "Jayson G Cohen" for tax periods ending December 31, 2010 and December 31, 2011. Four months later the Department removed the restrictions on his license.',
      src: 'Lien as cited in the November 8, 2026 Department of Insurance complaint; Order Removing Restrictions, September 22, 2015' },
    { k: 'sworn', big: '2 statements', head: 'Sworn in 2026, contradicted by the filing',
      body: 'Cohen swore that Elite "assumed" a $270,600 SBA loan "pursuant to the Purchase Agreement." The Purchase Agreement says "no liabilities or obligations of Seller are being assumed by Buyer." He also swore to a company sale on "a date unknown to me." See the comparison below.',
      src: 'Declaration of Jayson Cohen, October 29, 2026, paragraphs 8 and 9; Purchase Agreement, paragraph 5' },
    { k: 'alleg', big: 'RICO', head: 'He and his agency are federal defendants',
      body: 'Cohen and American Legacy Solutions LLC are named defendants on civil RICO and RICO conspiracy claims in the Central District of California. The claims are allegations.',
      src: 'C.D. Cal. No. 2:26-cv-03714-WLH-DFM, Third and Fourth Causes of Action' }
  ];
  var cardsEl = $('cards');
  cards.forEach(function (c, i) {
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'card';
    b.setAttribute('aria-expanded', 'false');
    b.innerHTML = tag(c.k) + '<span class="card-big">' + c.big + '</span><span class="card-head">' + c.head +
      '</span><span class="card-more"><span class="card-body">' + c.body + '</span><span class="card-src">Source: ' + c.src + '</span></span><span class="card-hint" aria-hidden="true">Details</span>';
    b.addEventListener('click', function () {
      var open = b.classList.toggle('open');
      b.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    cardsEl.appendChild(b);
  });

  /* ---------- License stepper ---------- */
  var steps = [
    { label: 'The question', cls: '', html:
      '<p class="k">Question No. 1 on the application</p><blockquote>"Have you ever been convicted (please read definition of crime below before answering) of, or are you currently charged with, committing a crime, whether or not adjudication was withheld? \'Crime\' includes a misdemeanor, felony or a military offense. ... \'Convicted\' includes, but is not limited to, having been found guilty by verdict of a judge or jury, having entered a plea of guilty or nolo contendere ..."</blockquote><p class="s">Statement of Issues, paragraph III</p>' },
    { label: 'His answer', cls: 'stamp', html:
      '<p class="k">Cohen\'s answer</p><div class="bigans">"No"</div><p class="s">Statement of Issues, paragraph III: "Respondent answered \'No\' to said question."</p>' },
    { label: 'The record', cls: '', html:
      '<p class="k">What the Commissioner said the record showed</p><blockquote>"On or about June 13, 2000, in Case No. 1012241, in the Superior Court of Santa Barbara County, Figueroa Division, State of California, Respondent was convicted upon a plea of nolo contendere of theft, a misdemeanor."</blockquote><p class="s">Statement of Issues, paragraph II</p>' },
    { label: 'The charges', cls: '', html:
      '<p class="k">What the Commissioner charged</p><ul class="charges"><li>"Such answer was false and known to Respondent to be false."</li><li>"Respondent is lacking in integrity."</li><li>"Respondent has previously engaged in a fraudulent practice or act."</li><li>Convicted of an offense involving "a fraudulent act or an act of dishonesty in acceptance, custody or payment of money or property."</li><li>"Respondent has knowingly or willfully made a misstatement in an application to the Insurance Commissioner."</li><li>"[I]t would be against the public interest to permit Respondent to transact insurance in the State of California."</li></ul><p class="s">Statement of Issues, paragraphs III through VIII</p>' },
    { label: 'The outcome', cls: '', html:
      '<p class="k">What happened</p><p>Department records cited in the 2026 complaint show a restricted license issued November 15, 2008. On September 22, 2015, the Commissioner ordered the restrictions "REMOVED" and issued "an unrestricted license."</p><p><strong>He has held that license ever since.</strong> Department records show it active through November 30, 2028.</p><p class="s">Order Removing Restrictions, File No. LBB 4044-BP (AR); Department license record, No. 0G23649</p>' }
  ];
  var si = 0, dots = $('stepDots'), body = $('stepBody'), prev = $('stepPrev'), next = $('stepNext');
  steps.forEach(function (s, i) {
    var li = document.createElement('li');
    var b = document.createElement('button');
    b.type = 'button'; b.textContent = s.label;
    b.addEventListener('click', function () { si = i; drawStep(); });
    li.appendChild(b); dots.appendChild(li);
  });
  function drawStep() {
    body.className = 'step-body ' + steps[si].cls;
    body.innerHTML = steps[si].html;
    Array.prototype.forEach.call(dots.querySelectorAll('button'), function (b, i) {
      b.className = i === si ? 'on' : (i < si ? 'done' : '');
      if (i === si) b.setAttribute('aria-current', 'step'); else b.removeAttribute('aria-current');
    });
    prev.disabled = si === 0;
    next.textContent = si === steps.length - 1 ? 'Start over' : 'Next';
  }
  prev.addEventListener('click', function () { if (si > 0) { si--; drawStep(); } });
  next.addEventListener('click', function () { si = si === steps.length - 1 ? 0 : si + 1; drawStep(); });
  drawStep();

  /* ---------- Timeline ---------- */
  var events = [
    { d: 'Jun 13, 2000', y: '2000', k: 'reg', t: 'Theft conviction',
      x: 'According to the Commissioner\'s Statement of Issues, Cohen "was convicted upon a plea of nolo contendere of theft, a misdemeanor," in Santa Barbara County Superior Court Case No. 1012241.',
      s: 'Statement of Issues, paragraph II' },
    { d: 'Jan 23, 2007', y: '2007', k: 'reg', t: 'Applies for a license and answers "No"',
      x: 'Cohen applied for a resident life agent license. Asked whether he had ever been convicted of a crime, he answered "No." The Commissioner then issued a Statement of Issues charging that the answer "was false and known to Respondent to be false" and that he "is lacking in integrity."',
      s: 'Statement of Issues, paragraphs I, III, V' },
    { d: 'Feb 9, 2008', y: '2008', k: 'pub', t: 'Charged with driving under the influence',
      x: 'While the application was pending, Ventura County Superior Court Case No. 2008005399 charged Cohen with driving under the influence and with driving with a blood-alcohol level of 0.08 percent or more (Veh. Code, § 23152, subds. (a), (b)). The outcome of that case is not stated in the records reviewed for this site. Neither the Statement of Issues nor the 2015 order mentions it.',
      s: 'Case No. 2008005399, as cited in the November 8, 2026 Department of Insurance complaint' },
    { d: 'Nov 15, 2008', y: '2008', k: 'reg', t: 'Restricted license issued',
      x: 'The Department issued Cohen a restricted license instead of the license he applied for.',
      s: 'Department license record, No. 0G23649, Order ID LBB004044, as cited in the complaint' },
    { d: 'Late 2008', y: '2008', k: 'pub', t: 'Sued in a collections action',
      x: 'About one month after the restricted license issued, CACH LLC sued Cohen in a collections action in Ventura County Superior Court. The outcome is not stated in the records reviewed for this site.',
      s: 'CACH LLC v. Jayson G. Cohen, No. 200800333325CLCL, as cited in the complaint' },
    { d: 'May 12, 2015', y: '2015', k: 'pub', t: '$45,981 federal tax lien recorded',
      x: 'The United States recorded a $45,981 federal tax lien against "Jayson G Cohen" for tax periods ending December 31, 2010 and December 31, 2011. A federal tax lien arises when a person liable for a tax "neglects or refuses to pay the same after demand." (26 U.S.C. § 6321.)',
      s: 'Lien as cited in the complaint' },
    { d: 'Sep 22, 2015', y: '2015', k: 'reg', t: 'Restrictions removed',
      x: 'Four months after the lien, the Commissioner found Cohen had "substantially met and complied with the restrictions and conditions placed upon said license" and ordered an unrestricted license issued.',
      s: 'Order Removing Restrictions, File No. LBB 4044-BP (AR)' },
    { d: 'Nov 26, 2022', y: '2022', k: 'sworn', t: 'Funds a $215,000 asset purchase',
      x: 'Elite Sound Company LLC bought the business assets of Entertainment Technology, LLC for $215,000. Cohen later swore: "I personally funded the $215,000.00 payment." The federal complaint alleges the seller had a book value of approximately $1,438,000; that figure is an allegation.',
      s: 'Cohen declaration, paragraph 7; Purchase Agreement; First Amended Complaint, paragraph 105' },
    { d: 'Apr 5, 2026', y: '2026', k: 'alleg', t: 'Federal racketeering action filed',
      x: 'A civil action was filed in the United States District Court for the Central District of California. The First Amended Complaint names Cohen and American Legacy Solutions LLC as defendants on civil RICO (18 U.S.C. § 1962(c)) and RICO conspiracy (18 U.S.C. § 1962(d)) claims. The claims are allegations.',
      s: 'No. 2:26-cv-03714-WLH-DFM' },
    { d: 'Apr 14, 2026', y: '2026', k: 'reg', t: 'Listed as authorized to transact for the agency',
      x: 'Since this date the Department\'s record has listed Cohen as authorized to transact for American Legacy Solutions, LLC, dba American Legacy Insurance Solutions, License No. 0M28275.',
      s: 'Department license record, as cited in the complaint' },
    { d: 'Oct 29, 2026', y: '2026', k: 'sworn', t: 'Signs a declaration under penalty of perjury',
      x: 'In Ventura County Superior Court Case No. 2024CUNP032821, Cohen swore that Elite "assumed" a $270,600 SBA loan "pursuant to the Purchase Agreement," and that the plaintiff "sold" a company called Airlink "on a date unknown to me." The Purchase Agreement states that "no liabilities or obligations of Seller are being assumed by Buyer."',
      s: 'Cohen declaration, paragraphs 8 and 9; Purchase Agreement, paragraph 5' },
    { d: 'Nov 5, 2026', y: '2026', k: 'alleg', t: 'Perjury prosecution requested',
      x: 'A criminal complaint and request for prosecution was submitted to the Ventura County District Attorney alleging two counts of perjury by Cohen (Pen. Code, § 118). This is a request by a private party. This site does not report that any charge has been filed.',
      s: 'Criminal Complaint and Request for Prosecution, November 5, 2026' },
    { d: 'Nov 8, 2026', y: '2026', k: 'alleg', t: 'License complaint filed with the Department',
      x: 'A complaint was filed asking the Department of Insurance to investigate and to revoke License Nos. 0G23649 and 0M28275 under Insurance Code sections 1668, 1668.5, and 1738.',
      s: 'Complaint to the Licensing Background Section, November 8, 2026' },
    { d: 'Dec 10, 2026', y: '2026', k: 'alleg', t: 'Hearing set on the motion his declaration supports',
      x: 'The defense motion in Case No. 2024CUNP032821, which relies on Cohen\'s declaration, is set for hearing in Department 43 of the Ventura County Superior Court.',
      s: 'Declaration captions, No. 2024CUNP032821' }
  ];
  var filters = [['all', 'Everything'], ['reg', "Regulator's record"], ['sworn', "Cohen's sworn words"], ['pub', 'Public record cited'], ['alleg', 'Allegations']];
  var fEl = $('filters'), tl = $('tl'), det = $('tlDetail'), cur = 'all', sel = 1;
  filters.forEach(function (f) {
    var b = document.createElement('button');
    b.type = 'button'; b.className = 'filter' + (f[0] === 'all' ? ' on' : ''); b.textContent = f[1];
    b.setAttribute('aria-pressed', f[0] === 'all' ? 'true' : 'false');
    b.addEventListener('click', function () {
      cur = f[0];
      Array.prototype.forEach.call(fEl.children, function (c) { c.classList.remove('on'); c.setAttribute('aria-pressed', 'false'); });
      b.classList.add('on'); b.setAttribute('aria-pressed', 'true');
      if (cur !== 'all' && events[sel].k !== cur) {
        for (var i = 0; i < events.length; i++) if (events[i].k === cur) { sel = i; break; }
      }
      drawTl();
    });
    fEl.appendChild(b);
  });
  events.forEach(function (e, i) {
    var b = document.createElement('button');
    b.type = 'button'; b.className = 'tl-item k-' + e.k; b.setAttribute('role', 'listitem');
    b.innerHTML = '<span class="tl-date">' + e.d + '</span><span class="tl-dot" aria-hidden="true"></span><span class="tl-title">' + e.t + '</span>';
    b.addEventListener('click', function () { sel = i; drawTl(); });
    tl.appendChild(b);
  });
  function drawTl() {
    Array.prototype.forEach.call(tl.children, function (b, i) {
      var dim = cur !== 'all' && events[i].k !== cur;
      b.classList.toggle('dim', dim);
      b.classList.toggle('on', i === sel);
      b.setAttribute('aria-pressed', i === sel ? 'true' : 'false');
    });
    var e = events[sel];
    det.innerHTML = '<div class="tl-detail-head">' + tag(e.k) + '<span class="tl-detail-date">' + e.d + '</span></div><h3>' + e.t + '</h3><p>' + e.x + '</p><p class="s">Source: ' + e.s + '</p>';
  }
  drawTl();

  /* ---------- Sworn vs. document ---------- */
  var cmps = [
    { tab: 'The $270,600 SBA loan',
      lh: 'Cohen swore', lq: '"Also pursuant to the Purchase Agreement, Elite assumed the Small Business Administration (\'SBA\') loan in the amount of $270,600.00. Elite has made the payments on that loan for approximately the past three (3) years, and the loan is in good standing."', ls: 'Declaration of Jayson Cohen, paragraph 8',
      rh: 'The Purchase Agreement says', rq: '"5. Non-Assumption of Liabilities. This Agreement covers only Seller\'s assets; no liabilities or obligations of Seller are being assumed by Buyer. All liabilities and obligations of Seller shall continue as Seller\'s liabilities and obligations and shall be paid solely by Seller."', rs: 'Business Assets Sale Agreement, November 26, 2022, paragraph 5, filed by Cohen\'s own lawyer in the same set of papers',
      why: 'Cohen named the contract as his source. He swore he owns ninety percent of the buyer and "personally funded" its $215,000 payment under that same agreement. The contract he cited says the buyer assumed nothing.' },
    { tab: 'The "sale" of Airlink',
      lh: 'Cohen swore', lq: '"[The plaintiff] also owned a second company, known as Airlink, which he sold to Advantage Telecom on a date unknown to me. Chris Brassers is the owner of Advantage Telecom."', ls: 'Declaration of Jayson Cohen, paragraph 9',
      rh: 'His lawyer\'s paralegal swore', rq: 'Airlink\'s business report "identifies [the plaintiff] in reported executive roles including chief executive officer, president, chief financial officer, director, and, secretary," and the Secretary of State report "identifies Airlink Internet, Inc. as active and in good standing with the Franchise Tax Board, and lists [the plaintiff] as its registered agent in the current filing information."', rs: 'Declaration of Rene Creamer, November 3, 2026, paragraphs 9 and 10, filed with the same motion',
      why: 'Cohen swore to the sale as a fact within his personal knowledge while admitting he does not know when it happened. The only source he names for anything about Airlink is "others in the telecommunications business."' }
  ];
  var tabs = $('cmpTabs'), cmp = $('cmp'), ci = 0;
  cmps.forEach(function (c, i) {
    var b = document.createElement('button');
    b.type = 'button'; b.setAttribute('role', 'tab'); b.textContent = c.tab;
    b.addEventListener('click', function () { ci = i; drawCmp(); });
    tabs.appendChild(b);
  });
  function drawCmp() {
    Array.prototype.forEach.call(tabs.children, function (b, i) {
      b.className = 'tab' + (i === ci ? ' on' : '');
      b.setAttribute('aria-selected', i === ci ? 'true' : 'false');
    });
    var c = cmps[ci];
    cmp.innerHTML =
      '<div class="cmp-col c-sworn"><h3>' + c.lh + '</h3><blockquote>' + c.lq + '</blockquote><p class="s">' + c.ls + '</p></div>' +
      '<div class="cmp-vs" aria-hidden="true">vs</div>' +
      '<div class="cmp-col c-doc"><h3>' + c.rh + '</h3><blockquote>' + c.rq + '</blockquote><p class="s">' + c.rs + '</p></div>' +
      '<p class="cmp-why">' + c.why + '</p>';
  }
  drawCmp();

  /* ---------- Bars ---------- */
  var bars = document.querySelectorAll('.bar');
  function grow() { Array.prototype.forEach.call(bars, function (b) { b.style.width = b.getAttribute('data-w') + '%'; }); }
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (en) {
      en.forEach(function (e) { if (e.isIntersecting) { grow(); io.disconnect(); } });
    }, { threshold: 0.3 });
    io.observe($('bars'));
  } else { grow(); }

  /* ---------- Network ---------- */
  var netText = {
    cohen: '<strong>Jayson Cohen.</strong> California insurance License No. 0G23649. He swore he is "a ninety percent (90%) owner" of Elite Sound Company, LLC. (Cohen declaration, paragraph 1.)',
    als: '<strong>American Legacy Solutions LLC.</strong> A licensed insurance agency, License No. 0M28275. The Department\'s record lists Cohen as authorized to transact for it. The federal complaint alleges it is "owned and controlled by Cohen" and that it "supplied or facilitated the capital, credit, accounts, resources, structure, business support, office support, and operating capacity for the acquisition." The second sentence is an allegation. (First Amended Complaint, paragraph 28.)',
    elite: '<strong>Elite Sound Company LLC.</strong> Cohen swore he owns ninety percent of it and that he "personally funded" its $215,000 payment. (Cohen declaration, paragraphs 1 and 7.)',
    et: '<strong>Entertainment Technology, LLC assets.</strong> Sold to Elite on November 26, 2022 for $215,000. The federal complaint alleges a book value of approximately $1,438,000, an allegation. (Purchase Agreement; First Amended Complaint, paragraph 105.)',
    addr: '<strong>One address.</strong> According to Department records and the federal complaint, Cohen, his insurance agency, and Elite Sound Company LLC all use the same Ventura office address. (Department license records; First Amended Complaint, paragraph 29.)'
  };
  var net = $('net'), info = $('netInfo');
  function pick(k) {
    if (!netText[k]) return;
    info.innerHTML = netText[k];
    Array.prototype.forEach.call(net.querySelectorAll('[data-k]'), function (n) {
      n.classList.toggle('on', n.getAttribute('data-k') === k);
    });
  }
  Array.prototype.forEach.call(net.querySelectorAll('[data-k]'), function (n) {
    n.addEventListener('click', function () { pick(n.getAttribute('data-k')); });
    n.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pick(n.getAttribute('data-k')); } });
  });
  pick('als');

  /* ---------- Status table ---------- */
  var rows = [
    ['Misdemeanor theft conviction on a nolo contendere plea, June 13, 2000', 'reg', 'Stated by the Insurance Commissioner in the Statement of Issues', 'Statement of Issues, paragraph II'],
    ['False "No" answer on the 2007 license application; "lacking in integrity"', 'reg', 'Charged in writing by the Insurance Commissioner. A restricted license followed; restrictions were removed in 2015', 'Statement of Issues, paragraphs III, V; Order Removing Restrictions'],
    ['Driving-under-the-influence charges, February 9, 2008', 'pub', 'Charged. Outcome not stated in the records reviewed', 'Ventura County Superior Court Case No. 2008005399, as cited in the complaint'],
    ['Collections lawsuit by CACH LLC, late 2008', 'pub', 'Filed. Outcome not stated in the records reviewed', 'No. 200800333325CLCL, as cited in the complaint'],
    ['$45,981 federal tax lien, May 12, 2015', 'pub', 'Recorded by the United States', 'Lien as cited in the complaint'],
    ['Swore Elite "assumed" the SBA loan "pursuant to the Purchase Agreement"', 'sworn', 'His sworn statement. The agreement says "no liabilities or obligations of Seller are being assumed by Buyer"', 'Cohen declaration, paragraph 8; Purchase Agreement, paragraph 5'],
    ['"Personally funded" the $215,000 asset purchase', 'sworn', 'His sworn statement', 'Cohen declaration, paragraph 7'],
    ['Perjury', 'alleg', 'Alleged. Prosecution requested November 5, 2026. No charge reported, no finding by any court', 'Request for Prosecution, Ventura County District Attorney'],
    ['Civil RICO and RICO conspiracy, against Cohen and American Legacy Solutions LLC', 'alleg', 'Alleged in a pending federal action. No ruling', 'No. 2:26-cv-03714-WLH-DFM'],
    ['License status', 'reg', 'Both licenses active as of November 8, 2026 (No. 0G23649 through November 30, 2028; No. 0M28275 through April 30, 2028)', 'Department license records, as cited in the complaint']
  ];
  var tb = $('statusRows');
  rows.forEach(function (r) {
    var tr = document.createElement('tr');
    tr.innerHTML = '<td>' + r[0] + '</td><td>' + tag(r[1]) + '<span class="st">' + r[2] + '</span></td><td class="s">' + r[3] + '</td>';
    tb.appendChild(tr);
  });
})();
