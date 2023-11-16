export default {
  "sTI8v": {
    "aggregation": "avg",
    "description": "",
    "form": {
      "name": "simple",
      "screen_name": "Простой"
    },
    "is_negative": "false",
    "name": "Соблюдение алгоритма",
    "reference": "",
    "role": {
      "screen_name": "Дисциплина",
      "name": "discipline"
    },
    "screen_name": "sTI8v",
    "short_name": "САЛГ",
    "track": {
      "name": "operator",
      "screen_name": "Оператор"
    },
    "type": {
      "screen_name": "Оценка тренером",
      "name": "grade"
    }
  },
  "n6jrX": {
    "aggregation": "avg",
    "description": "",
    "form": {
      "name": "simple",
      "screen_name": "Простой"
    },
    "is_negative": "false",
    "name": "Оценка интонации",
    "reference": "",
    "role": {
      "screen_name": "Дисциплина",
      "name": "discipline"
    },
    "screen_name": "n6jrX",
    "short_name": "ИНТЦ",
    "track": {
      "name": "operator",
      "screen_name": "Оператор"
    },
    "type": {
      "screen_name": "Оценка тренером",
      "name": "grade"
    }
  },
  "script": {
    "screen_name": "script",
    "name": "Скрипт, %",
    "short_name": "СКР",
    "norm": "20",
    "description": "Полнота скрипта",
    "role": {
      "name": "discipline",
      "screen_name": "Дисциплина"
    },
    "type": {
      "name": "keyword",
      "screen_name": "Речевой"
    },
    "form": {
      "name": "compound",
      "screen_name": "Сложный"
    },
    "track": {
      "name": "operator",
      "screen_name": "Оператор"
    },
    "reference": "",
    "is_negative": "false",
    "aggregation": "avg"
  },
  "courtesy": {
    "screen_name": "courtesy",
    "name": "Термины вежливости, %",
    "short_name": "ВЖЛ",
    "norm": "10",
    "description": "Использование вежливой лексики на шагах скрипта, %",
    "role": {
      "name": "empathy",
      "screen_name": "Эмпатия"
    },
    "type": {
      "name": "keyword",
      "screen_name": "Речевой"
    },
    "form": {
      "name": "simple",
      "screen_name": "Простой"
    },
    "track": {
      "name": "operator",
      "screen_name": "Оператор"
    },
    "reference": "36875588597719040",
    "is_negative": "false",
    "aggregation": "avg",
    "weight": "0"
  },
  "interrupts": {
    "screen_name": "interrupts",
    "name": "Перебивание",
    "short_name": "ПРБ",
    "units": {
      "name": "value",
      "screen_name": "сек."
    },
    "norm": "15",
    "description": "Время наложения голоса оператора и клиента",
    "role": {
      "name": "empathy",
      "screen_name": "Эмпатия"
    },
    "type": {
      "name": "meta",
      "screen_name": "Метаданные"
    },
    "form": {
      "name": "simple",
      "screen_name": "простой"
    },
    "is_negative": "true",
    "aggregation": "avg",
    "reference": "meta.interrupts"
  },
  "S8Wfw": {
    "screen_name": "S8Wfw",
    "name": "Благодарность клиента, %",
    "short_name": "БГК",
    "norm": "50",
    "description": "",
    "role": {
      "name": "empathy",
      "screen_name": "Эмпатия"
    },
    "type": {
      "name": "keyword",
      "screen_name": "Речевой"
    },
    "track": {
      "name": "client",
      "screen_name": "Клиент"
    },
    "form": {
      "name": "simple",
      "screen_name": "простой"
    },
    "reference": "55360719532597248",
    "is_negative": "false",
    "aggregation": "avg"
  },
  "restrictions": {
    "screen_name": "restrictions",
    "name": "Непрофессионализм, %",
    "short_name": "НПРФ",
    "description": "Термины непрофессионализма и отказа в помощи",
    "role": {
      "name": "discipline",
      "screen_name": "Дисциплина"
    },
    "type": {
      "name": "keyword",
      "screen_name": "Речевой"
    },
    "form": {
      "name": "simple",
      "screen_name": "Простой"
    },
    "track": {
      "name": "operator",
      "screen_name": "Оператор"
    },
    "is_negative": "true",
    "aggregation": "avg",
    "reference": "260135856860307456",
    "weight": "0"
  },
  "calltime": {
    "screen_name": "calltime",
    "name": "Среднее время звонка",
    "short_name": "СВЗ",
    "norm": "200",
    "description": "Среднее время звонка",
    "role": {
      "name": "expenses",
      "screen_name": "Затраты"
    },
    "type": {
      "name": "meta",
      "screen_name": "Метаданные"
    },
    "units": {
      "name": "normalized",
      "screen_name": "%"
    },
    "form": {
      "name": "simple",
      "screen_name": "простой"
    },
    "reference": "meta.calltime_net",
    "is_negative": "true",
    "aggregation": "avg"
  },
  "yle9z": {
    "screen_name": "yle9z",
    "name": "Приветствие, %",
    "short_name": "ПРВ",
    "description": "Контроль исполнения шагов чек-листа на блоке \"Приветствие\"",
    "role": {
      "name": "empathy",
      "screen_name": "Эмпатия"
    },
    "type": {
      "name": "keyword",
      "screen_name": "Речевой"
    },
    "track": {
      "name": "operator",
      "screen_name": "Оператор"
    },
    "form": {
      "name": "simple",
      "screen_name": "Простой"
    },
    "is_negative": "false",
    "aggregation": "avg",
    "reference": "163706536546279424"
  },
  "bVj7G": {
    "screen_name": "bVj7G",
    "name": "Прощание, %",
    "short_name": "ПРН",
    "description": "Использование терминов прощания: до свидания, всего доброго.",
    "role": {
      "name": "empathy",
      "screen_name": "Эмпатия"
    },
    "type": {
      "name": "keyword",
      "screen_name": "Речевой"
    },
    "track": {
      "name": "operator",
      "screen_name": "Оператор"
    },
    "form": {
      "name": "simple",
      "screen_name": "Простой"
    },
    "is_negative": "false",
    "aggregation": "avg",
    "reference": "36875594851426304"
  },
  "meN7J": {
    "screen_name": "meN7J",
    "name": "Отказ в помощи, %",
    "short_name": "ОПМ",
    "norm": "50",
    "description": "Использование нежелательной лексики отказа: не могу помочь, я не знаю, мне не сообщили, это не в моей компетенции.",
    "role": {
      "name": "empathy",
      "screen_name": "Эмпатия"
    },
    "type": {
      "name": "keyword",
      "screen_name": "Речевой"
    },
    "form": {
      "name": "simple",
      "screen_name": "Простой"
    },
    "track": {
      "name": "operator",
      "screen_name": "Оператор"
    },
    "reference": "54290826351616000",
    "is_negative": "true",
    "aggregation": "avg"
  },
  "nr67t": {
    "screen_name": "nr67t",
    "name": "Шаблоны возврата",
    "short_name": "Возврат",
    "description": "",
    "type": {
      "name": "keyword",
      "screen_name": "Речевой"
    },
    "form": {
      "name": "simple",
      "screen_name": "Простой"
    },
    "track": {
      "name": "operator",
      "screen_name": "Оператор"
    },
    "reference": "255025208870576128",
    "is_negative": "false",
    "aggregation": "avg"
  },
  "nv47t": {
    "screen_name": "nv47t",
    "name": "Выполнение возврата",
    "short_name": "Выполнение возврата",
    "description": "",
    "type": {
      "name": "filter",
      "screen_name": "Фильтр"
    },
    "form": {
      "name": "simple",
      "screen_name": "Простой"
    },
    "track": {
      "name": "operator",
      "screen_name": "Оператор"
    },
    "is_negative": "false",
    "aggregation": "avg"
  },
  "1BiEh": {
    "screen_name": "1BiEh",
    "name": "Приветствие +",
    "short_name": "ЗД+",
    "norm": "50",
    "description": "Правильное приветствие - \"здравствуйте\"",
    "role": {
      "name": "empathy",
      "screen_name": "Эмпатия"
    },
    "type": {
      "name": "keyword",
      "screen_name": "Речевой"
    },
    "track": {
      "name": "operator",
      "screen_name": "Оператор"
    },
    "form": {
      "name": "simple",
      "screen_name": "простой"
    },
    "reference": "62616696812216320",
    "is_negative": "false",
    "aggregation": "avg"
  },
  "Zi6I6": {
    "screen_name": "Zi6I6",
    "name": "Приветствие -",
    "short_name": "ЗД-",
    "norm": "50",
    "description": "Неправильное приветствие - \"доброе утро\", \"добрый день\", \"добрый вечер\", просторечные приветствия \"здрасьте\".",
    "role": {
      "name": "empathy",
      "screen_name": "Эмпатия"
    },
    "type": {
      "name": "keyword",
      "screen_name": "Речевой"
    },
    "track": {
      "name": "operator",
      "screen_name": "Оператор"
    },
    "form": {
      "name": "simple",
      "screen_name": "простой"
    },
    "reference": "62616773748334592",
    "is_negative": "true",
    "aggregation": "avg"
  },
  "QAsXq": {
    "screen_name": "QAsXq",
    "name": "Авиакомпания +",
    "short_name": "АК+",
    "norm": "50",
    "description": "Правильное представление - \"авиакомпания\".",
    "role": {
      "name": "empathy",
      "screen_name": "Эмпатия"
    },
    "type": {
      "name": "keyword",
      "screen_name": "Речевой"
    },
    "track": {
      "name": "operator",
      "screen_name": "Оператор"
    },
    "form": {
      "name": "simple",
      "screen_name": "простой"
    },
    "reference": "62619276015575040",
    "is_negative": "false",
    "aggregation": "avg"
  },
  "Cqb5a": {
    "screen_name": "Cqb5a",
    "name": "Авиакомпания -",
    "short_name": "АК-",
    "norm": "50",
    "description": "Неправильное представление а/к - \"компания\".",
    "role": {
      "name": "empathy",
      "screen_name": "Эмпатия"
    },
    "type": {
      "name": "keyword",
      "screen_name": "Речевой"
    },
    "track": {
      "name": "operator",
      "screen_name": "Оператор"
    },
    "form": {
      "name": "simple",
      "screen_name": "простой"
    },
    "reference": "62619340930818048",
    "is_negative": "true",
    "aggregation": "avg"
  },
  "PZyTZ": {
    "screen_name": "PZyTZ",
    "name": "Благодарность оператора, %",
    "short_name": "БГО",
    "norm": "50",
    "description": "",
    "role": {
      "name": "empathy",
      "screen_name": "Эмпатия"
    },
    "type": {
      "name": "keyword",
      "screen_name": "Речевой"
    },
    "track": {
      "name": "operator",
      "screen_name": "Оператор"
    },
    "form": {
      "name": "simple",
      "screen_name": "простой"
    },
    "reference": "54290616544141312",
    "is_negative": "false",
    "aggregation": "avg"
  },
  "gj3jB": {
    "screen_name": "gj3jB",
    "name": "Макс. время  паузы",
    "short_name": "МВП",
    "description": "Доля звонков с превышением нормы максимальной длительности паузы.",
    "role": {
      "name": "expenses",
      "screen_name": "Затраты"
    },
    "type": {
      "name": "meta",
      "screen_name": "Метаданные"
    },
    "track": {
      "name": "operator",
      "screen_name": "Оператор"
    },
    "units": {
      "name": "normalized",
      "screen_name": "%"
    },
    "is_negative": "true",
    "form": {
      "name": "simple",
      "screen_name": "простой"
    },
    "aggregation": "avg",
    "reference": "meta.silence_max",
    "value": "NORM_PERCENT"
  },
  "X761d": {
    "screen_name": "X761d",
    "name": "Невежливость, %",
    "short_name": "НВЖЛ",
    "description": "Использование терминов невежливости.",
    "role": {
      "name": "empathy",
      "screen_name": "Эмпатия"
    },
    "type": {
      "name": "keyword",
      "screen_name": "Речевой"
    },
    "form": {
      "name": "simple",
      "screen_name": "Простой"
    },
    "track": {
      "name": "operator",
      "screen_name": "Оператор"
    },
    "is_negative": "true",
    "aggregation": "avg",
    "reference": "105426089068732416"
  },
  "f1O0q": {
    "screen_name": "f1O0q",
    "name": "Выявление потребностей",
    "short_name": "ПТР",
    "description": "Выявление потребностей клиента.",
    "role": {
      "name": "sales",
      "screen_name": "Продажи"
    },
    "type": {
      "name": "filter",
      "screen_name": "Фильтр"
    },
    "track": {
      "name": "operator",
      "screen_name": "Оператор"
    },
    "form": {
      "name": "simple",
      "screen_name": "простой"
    },
    "is_negative": "false",
    "aggregation": "avg"
  },
  "lw0Co": {
    "screen_name": "lw0Co",
    "name": "Уточнение",
    "short_name": "УТЧ",
    "description": "Информирование о правилах тарифа (услуги), выяснение личных данных клиента для оформления, проверка деталей.",
    "role": {
      "name": "sales",
      "screen_name": "Продажи"
    },
    "type": {
      "name": "filter",
      "screen_name": "Фильтр"
    },
    "track": {
      "name": "operator",
      "screen_name": "Оператор"
    },
    "form": {
      "name": "simple",
      "screen_name": "простой"
    },
    "is_negative": "false",
    "aggregation": "avg"
  },
  "CbgWz": {
    "screen_name": "CbgWz",
    "name": "Оформление",
    "short_name": "ОФМ",
    "description": "Создание бронирования, консультация по оплате, перевод на оплату",
    "role": {
      "name": "sales",
      "screen_name": "Продажи"
    },
    "type": {
      "name": "filter",
      "screen_name": "Фильтр"
    },
    "track": {
      "name": "operator",
      "screen_name": "Оператор"
    },
    "form": {
      "name": "simple",
      "screen_name": "простой"
    },
    "is_negative": "false",
    "aggregation": "avg"
  },
  "GT0Tb": {
    "screen_name": "GT0Tb",
    "name": "Ответ с выгодой",
    "short_name": "ВГД",
    "description": "Информирование о стоимости, подтверждение.",
    "role": {
      "name": "sales",
      "screen_name": "Продажи"
    },
    "type": {
      "name": "filter",
      "screen_name": "Фильтр"
    },
    "track": {
      "name": "operator",
      "screen_name": "Оператор"
    },
    "form": {
      "name": "simple",
      "screen_name": "простой"
    },
    "is_negative": "false",
    "aggregation": "avg"
  },
  "3V43c": {
    "screen_name": "3V43c",
    "name": "Проверка деталей",
    "short_name": "ПД",
    "description": "Проверка деталей бронирования и запрос подтверждения правильности информации от клиента.",
    "role": {
      "name": "discipline",
      "screen_name": "Дисциплина"
    },
    "type": {
      "name": "keyword",
      "screen_name": "Речевой"
    },
    "track": {
      "name": "operator",
      "screen_name": "Оператор"
    },
    "form": {
      "name": "simple",
      "screen_name": "Простой"
    },
    "is_negative": "false",
    "aggregation": "avg",
    "reference": "124223192460959744"
  },
  "WaDmQ": {
    "screen_name": "WaDmQ",
    "name": "Статус заявки",
    "short_name": "СТЗ",
    "description": "",
    "role": {
      "name": "discipline",
      "screen_name": "Дисциплина"
    },
    "type": {
      "name": "filter",
      "screen_name": "Фильтр"
    },
    "form": {
      "name": "simple",
      "screen_name": "простой"
    },
    "track": {
      "name": "operator",
      "screen_name": "Оператор"
    },
    "is_negative": "false",
    "aggregation": "avg"
  },
  "6n1pF": {
    "screen_name": "6n1pF",
    "name": "Понимание и сочувствие",
    "short_name": "ВПС",
    "description": "Выражение понимания и сочувствия клиенту",
    "role": {
      "name": "empathy",
      "screen_name": "Эмпатия"
    },
    "type": {
      "name": "keyword",
      "screen_name": "Речевой"
    },
    "track": {
      "name": "operator",
      "screen_name": "Оператор"
    },
    "form": {
      "name": "simple",
      "screen_name": "Простой"
    },
    "is_negative": "false",
    "aggregation": "avg",
    "reference": "173394200409153536"
  },
  "LWu3T": {
    "screen_name": "LWu3T",
    "name": "Скрипт продаж, %",
    "short_name": "ПСКР",
    "description": "Контроль исполнения шагов скриптов продаж",
    "role": {
      "name": "discipline",
      "screen_name": "Дисциплина"
    },
    "type": {
      "name": "filter",
      "screen_name": "Фильтр"
    },
    "track": {
      "name": "operator",
      "screen_name": "Оператор"
    },
    "form": {
      "name": "simple",
      "screen_name": "Простой"
    },
    "is_negative": "false",
    "aggregation": "avg"
  },
  "9YlLg": {
    "screen_name": "9YlLg",
    "name": "Скрипт обмена, %",
    "short_name": "ОБМ",
    "description": "",
    "role": {
      "name": "discipline",
      "screen_name": "Дисциплина"
    },
    "type": {
      "name": "filter",
      "screen_name": "Фильтр"
    },
    "track": {
      "name": "operator",
      "screen_name": "Оператор"
    },
    "form": {
      "name": "simple",
      "screen_name": "Простой"
    },
    "is_negative": "false",
    "aggregation": "avg"
  },
  "5uN6o": {
    "screen_name": "5uN6o",
    "name": "Приветствие СЦ исх",
    "short_name": "ПРВисх",
    "description": "Приветствие СЦ только на исходящих звонках.",
    "role": {
      "name": "discipline",
      "screen_name": "Дисциплина"
    },
    "type": {
      "name": "filter",
      "screen_name": "Фильтр"
    },
    "track": {
      "name": "operator",
      "screen_name": "Оператор"
    },
    "form": {
      "name": "simple",
      "screen_name": "простой"
    },
    "is_negative": "false",
    "aggregation": "avg"
  },
  "EGnJK": {
    "screen_name": "EGnJK",
    "name": "Приветствие СЦ",
    "short_name": "ПРВСЦ",
    "description": "Приветствие СЦ на входящих и исходящих звонках.",
    "role": {
      "name": "empathy",
      "screen_name": "Эмпатия"
    },
    "type": {
      "name": "keyword",
      "screen_name": "Речевой"
    },
    "track": {
      "name": "operator",
      "screen_name": "Оператор"
    },
    "form": {
      "name": "simple",
      "screen_name": "Простой"
    },
    "is_negative": "false",
    "aggregation": "avg",
    "reference": "257973101457842176"
  },
  "VkAqF": {
    "screen_name": "VkAqF",
    "name": "Приветствие СЦ вх",
    "short_name": "ПРВвх",
    "description": "Приветствие СЦ только на входящих звонках.",
    "role": {
      "name": "discipline",
      "screen_name": "Дисциплина"
    },
    "type": {
      "name": "filter",
      "screen_name": "Фильтр"
    },
    "track": {
      "name": "operator",
      "screen_name": "Оператор"
    },
    "form": {
      "name": "simple",
      "screen_name": "простой"
    },
    "is_negative": "false",
    "aggregation": "avg"
  },
  "tJ7l0": {
    "aggregation": "avg",
    "description": "",
    "form": {
      "name": "simple",
      "screen_name": "Простой"
    },
    "is_negative": false,
    "name": "Решение по первому звонку",
    "reference": "meta.fcr",
    "role": {
      "name": "",
      "screen_name": ""
    },
    "screen_name": "tJ7l0",
    "short_name": "FCR",
    "track": {
      "name": "operator",
      "screen_name": "Оператор"
    },
    "type": {
      "screen_name": "Метаданные",
      "name": "meta"
    }
  },
  "f4RYC": {
    "aggregation": "avg",
    "description": "",
    "form": {
      "name": "simple",
      "screen_name": "Простой"
    },
    "is_negative": false,
    "name": "Удовлетворенность клиента",
    "reference": "meta.csat",
    "role": {
      "name": "",
      "screen_name": ""
    },
    "screen_name": "f4RYC",
    "short_name": "CSAT",
    "track": {
      "name": "operator",
      "screen_name": "Оператор"
    },
    "type": {
      "screen_name": "Метаданные",
      "name": "meta"
    }
  },
  "1hgy3": {
    "aggregation": "avg",
    "short_name": "Алгоритмы и шаблоны",
    "name": "Алгоритмы и шаблоны",
    "type": {
      "screen_name": "Группа",
      "name": "group"
    },
    "form": {
      "name": "simple",
      "screen_name": "Простой"
    },
    "parameters": [
      "sTI8v",
      "WaDmQ",
      "LWu3T",
      "9YlLg",
      "script"
    ]
  },
  "7f8ds": {
    "aggregation": "avg",
    "name": "Этикет звонка",
    "short_name": "Этикет звонка",
    "type": {
      "screen_name": "Группа",
      "name": "group"
    },
    "form": {
      "name": "simple",
      "screen_name": "Простой"
    },
    "parameters": [
      "yle9z",
      "bVj7G"
    ]
  },
  "66dhg": {
    "aggregation": "avg",
    "name": "Эмпатия и вовлеченность",
    "short_name": "Эмпатия",
    "type": {
      "screen_name": "Группа",
      "name": "group"
    },
    "form": {
      "name": "simple",
      "screen_name": "Простой"
    },
    "parameters": [
      "n6jrX",
      "courtesy",
      "6n1pF",
      "restrictions",
      "X761d"
    ]
  },
  "226sh": {
    "aggregation": "avg",
    "name": "Паузы и перебивания",
    "short_name": "Паузы и перебивания",
    "type": {
      "screen_name": "Группа",
      "name": "group"
    },
    "form": {
      "name": "simple",
      "screen_name": "Простой"
    },
    "parameters": [
      "interrupts",
      "gj3jB"
    ]
  },
  "9hg34": {
    "aggregation": "avg",
    "name": "Оценка тренера",
    "short_name": "Оценка тренера",
    "type": {
      "screen_name": "Группа",
      "name": "group"
    },
    "form": {
      "name": "coach",
      "screen_name": "coach"
    },
    "parameters": [
      "sTI8v",
      "n6jrX"
    ]
  },
  "1yt56": {
    "aggregation": "avg",
    "name": "Оценка клиента",
    "short_name": "Оценка клиента",
    "type": {
      "screen_name": "Группа",
      "name": "group"
    },
    "form": {
      "name": "client",
      "screen_name": "client"
    },
    "parameters": [
      "f4RYC"
    ]
  },
  "3342h": {
    "aggregation": "avg",
    "name": "Прочее",
    "short_name": "Прочее",
    "type": {
      "screen_name": "Группа",
      "name": "group"
    },
    "form": {
      "name": "simple",
      "screen_name": "Простой"
    },
    "parameters": [
      "nr67t",
      "nv47t"
    ]
  },
  "345ht": {
    "aggregation": "avg",
    "short_name": "Алгоритмы и шаблоны",
    "name": "Алгоритмы и шаблоны (priority)",
    "type": {
      "screen_name": "Группа",
      "name": "group"
    },
    "form": {
      "name": "simple",
      "screen_name": "Простой"
    },
    "parameters": [
      "script",
      "nr67t",
      "sTI8v",
      "3V43c",
      "WaDmQ",
      "LWu3T"
    ]
  },
  "123vt": {
    "aggregation": "avg",
    "short_name": "Алгоритмы и шаблоны",
    "name": "Алгоритмы и шаблоны (СЦ)",
    "type": {
      "screen_name": "Группа",
      "name": "group"
    },
    "form": {
      "name": "simple",
      "screen_name": "Простой"
    },
    "parameters": [
      "sTI8v",
      "script"
    ]
  },
  "678gh": {
    "aggregation": "avg",
    "short_name": "Этикет звонка",
    "name": "Этикет звонка (СЦ)",
    "type": {
      "screen_name": "Группа",
      "name": "group"
    },
    "form": {
      "name": "simple",
      "screen_name": "Простой"
    },
    "parameters": [
      "EGnJK",
      "bVj7G"
    ]
  },
  "etecet": {
    "aggregation": "avg",
    "short_name": "Этикет звонка",
    "name": "Этикет звонка (GAP)",
    "type": {
      "screen_name": "Группа",
      "name": "group"
    },
    "form": {
      "name": "simple",
      "screen_name": "Простой"
    },
    "parameters": [
      "yle9z",
      "bVj7G",
      "script"
    ]
  }
}