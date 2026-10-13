/**
 * Interactive UI guide for the `?` help button.
 *
 * Mirrors the LearnPowerShell "UI Guide": a list of the app's live regions,
 * each described and able to Highlight itself on screen so learners connect
 * documentation concepts to on-screen controls.
 */

import type { Locale } from './i18n';

export interface GuideRegion {
  id: string;
  /** CSS selector matched against the live DOM for the highlight tour. */
  selector: string;
  title: string;
  what: string;
  how: string;
}

/**
 * Live regions the guide can highlight, with localized copy.
 */
export function guideRegions(locale: Locale = 'fa'): GuideRegion[] {
  if (locale === 'fa') {
    return [
      {
        id: 'brand',
        selector: '.brand',
        title: 'نشان و حالت',
        what: 'عنوان LearnSQL و نام مرحلهٔ فعلی، یا حالت سندباکس.',
        how: 'در بالای صفحه وضعیت فعلی شما را نشان می‌دهد.',
      },
      {
        id: 'toolbar',
        selector: '.toolbar-actions',
        title: 'نوار ابزار و منو',
        what: 'منوی زبان و دکمه‌های ناوبری: مراحل، درس، هدف، نکته، راه‌حل، واگرد، بازنشانی و سندباکس.',
        how: 'روی دکمه‌های منوی ناوبری بزنید تا عملیات سریع انجام شود.',
      },
      {
        id: 'schema',
        selector: '.panel:not(.goal-panel)',
        title: 'ساختار پایگاه داده',
        what: 'فهرست زندهٔ جداول، ستون‌ها و تعداد ردیف‌ها.',
        how: 'با کلیک روی نام یک جدول، نام آن به ویرایشگر اضافه می‌شود.',
      },
      {
        id: 'pipeline',
        selector: '.pipeline',
        title: 'نوار پایپ‌لاین',
        what: 'جریان اجرای سوال، مرحله‌به‌مرحله: از FROM و JOIN تا WHERE و SELECT.',
        how: 'پس از اجرا، هر بخش به‌تدریج هایلایت می‌شود تا روند پرس‌وجو را ببینید.',
      },
      {
        id: 'editor',
        selector: '.editor-wrap',
        title: 'ویرایشگر SQL',
        what: 'جایی که کوئری را می‌نویسید؛ با تکمیل خودکار Tab و اجرای Ctrl/Cmd+Enter.',
        how: 'کد را بنویسید، Tab برای تکمیل، و Ctrl/Cmd+Enter برای اجرا بزنید.',
      },
      {
        id: 'result',
        selector: '.result-wrap',
        title: 'نتیجهٔ پرس‌وجو',
        what: 'خروجی کوئری به‌صورت جدول، همراه با پیام تأیید یا خطا.',
        how: 'نتیجهٔ آخرین اجرا اینجا نمایش داده می‌شود.',
      },
      {
        id: 'goal',
        selector: '.goal-panel',
        title: 'پنل هدف مرحله',
        what: 'هدف مرحلهٔ فعلی و پیش‌نمایش جدول مورد انتظار، به‌همراه وضعیت حل.',
        how: 'هدف را دنبال کنید تا ردیف‌های منطبق سبز شوند و مرحله حل شود.',
      },
      {
        id: 'console',
        selector: '.console',
        title: 'کنسول دستورات',
        what: 'پرامپت متنی برای دستورات خاص مثل help، levels، hint و reset.',
        how: 'یک دستور را تایپ کنید و Enter بزنید؛ مثلاً help برای راهنما.',
      },
    ];
  }

  if (locale === 'de') {
    return [
      {
        id: 'brand',
        selector: '.brand',
        title: 'Marke & Modus',
        what: 'Der LearnSQL-Titel und der Name der aktuellen Stufe oder der Sandbox.',
        how: 'Zeigt oben den aktuellen Level oder den Freispiel-Modus an.',
      },
      {
        id: 'toolbar',
        selector: '.toolbar-actions',
        title: 'Werkzeugleiste & Menü',
        what: 'Sprachmenü und Navigationsaktionen: Level, Lektion, Ziel, Hinweis, Lösung, Rückgängig, Zurücksetzen und Sandbox.',
        how: 'Nutze die Navigationsbuttons für schnelle Aktionen.',
      },
      {
        id: 'schema',
        selector: '.panel:not(.goal-panel)',
        title: 'Datenbankschema',
        what: 'Live-Liste der Tabellen, Spalten und Zeilenanzahlen.',
        how: 'Klicke einen Tabellennamen, um ihn in den Editor einzufügen.',
      },
      {
        id: 'pipeline',
        selector: '.pipeline',
        title: 'Pipeline-Leiste',
        what: 'Der Abfragefluss, Schritt für Schritt: von FROM und JOIN bis WHERE und SELECT.',
        how: 'Nach der Ausführung leuchtet jede Stufe auf, um den Abfragefluss zu zeigen.',
      },
      {
        id: 'editor',
        selector: '.editor-wrap',
        title: 'SQL-Editor',
        what: 'Hier schreibst du deine Abfrage, mit Tab-Vervollständigung und Ctrl/Cmd+Enter zum Ausführen.',
        how: 'Tippe SQL ein, drücke Tab zum Vervollständigen und Ctrl/Cmd+Enter zum Ausführen.',
      },
      {
        id: 'result',
        selector: '.result-wrap',
        title: 'Abfrageergebnisse',
        what: 'Die Ausgabe deiner Abfrage als Tabelle, inklusive Bestätigungs- oder Fehlermeldung.',
        how: 'Dein letztes Ergebnis erscheint hier.',
      },
      {
        id: 'goal',
        selector: '.goal-panel',
        title: 'Level-Ziel-Panel',
        what: 'Das Ziel der aktuellen Stufe und eine Vorschau der erwarteten Tabelle, mit Löse-Status.',
        how: 'Erfülle das Ziel, damit die passenden Zeilen grün werden und der Level gelöst ist.',
      },
      {
        id: 'console',
        selector: '.console',
        title: 'Befehls-Konsole',
        what: 'Eine Texteingabe für Spezialbefehle wie help, levels, hint und reset.',
        how: 'Tippe einen Befehl und drücke Enter, z. B. help für Hilfe.',
      },
    ];
  }

  return [
    {
      id: 'brand',
      selector: '.brand',
      title: 'Brand & Mode',
      what: 'The LearnSQL title and the current level name, or Sandbox.',
      how: 'Shows the current challenge or free-play mode at the top.',
    },
    {
      id: 'toolbar',
      selector: '.toolbar-actions',
      title: 'Toolbar & Menu',
      what: 'Language menu and the navigation actions: Levels, Lesson, Goal, Hint, Solution, Undo, Reset, and Sandbox.',
      how: 'Use the navigation buttons for quick actions.',
    },
    {
      id: 'schema',
      selector: '.panel:not(.goal-panel)',
      title: 'Database Schema',
      what: 'Live list of tables, columns and row counts.',
      how: 'Click a table name to insert it into the editor.',
    },
    {
      id: 'pipeline',
      selector: '.pipeline',
      title: 'Pipeline Bar',
      what: 'The query flow, step by step: from FROM and JOIN through WHERE to SELECT.',
      how: 'After you run, each stage lights up to show how the query flows.',
    },
    {
      id: 'editor',
      selector: '.editor-wrap',
      title: 'SQL Editor',
      what: 'Where you write your query, with Tab autocomplete and Ctrl/Cmd+Enter to run.',
      how: 'Type your SQL, press Tab to complete, then Ctrl/Cmd+Enter to run.',
    },
    {
      id: 'result',
      selector: '.result-wrap',
      title: 'Query Results',
      what: 'The output of your query as a table, with any success or error message.',
      how: 'Your latest result appears here.',
    },
    {
      id: 'goal',
      selector: '.goal-panel',
      title: 'Level Goal Panel',
      what: "The current level's goal and a preview of the expected table, with solve status.",
      how: 'Match the goal so the matched rows turn green and the level is solved.',
    },
    {
      id: 'console',
      selector: '.console',
      title: 'Command Console',
      what: 'A text prompt for special commands like help, levels, hint and reset.',
      how: 'Type a command and press Enter, e.g. help for help.',
    },
  ];
}
