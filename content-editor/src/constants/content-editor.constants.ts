import { ToolbarItem } from "@annuadvent/ngx-common-ui/toolbar";
import { EditorElement } from "../interfaces/content-editor.interface";

export enum SUPPORTED_TAGS {
  H1 = "h1",
  H2 = "h2",
  H3 = "h3",
  H4 = "h4",
  H5 = "h5",
  H6 = "h6",
  IMAGE = "img",
  PARAGRAPH = "p",
  CODE_BLOCK = "anu-code-block",
  LIST_ITEM = "li",
  ORDERED_LIST = "ol",
  UNORDERED_LIST = "ul",
  ARTICLE = "article",
  DIV = "div",
  TABLE = "anu-table",
}

export const EDITOR_ROOT_ELEMENT: EditorElement = {
  name: "root",
  tagName: "div",
  isContainer: true,
  children: [
    {
      name: "h2-1234",
      tagName: "h2",
      data: {
        text: "Example heading text",
      },
    },
    {
      name: "p-1234",
      tagName: "p",
      data: {
        text: "Example description text",
      },
    },
  ],
};

export const TOOLBAR_FORMATTING: Array<ToolbarItem> = [
  {
    name: "link",
    title: "Hyperlink",
    label: "",
    icon: "",
    iconImage:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAABFZJREFUaEPtmHnoZmMUxz+jsW+DTNnJmr2GyBIRkS1GIiRqUBNiCGWL4g9rsiQKZUlD9hFDSZMsf6BhBtmyZons2fXhPHrcuet7f83br+755+2993nOc77P+Z7tTmGSy5RJbj8DgHF7cPDA4IGeNzBQqOcF9t4+bg9MBbYB1gd+Bz4C3gL+aItsXAA2Bc4FjgJWLxj7JXAvcCXwcROQcQA4E7gCWL7BuO+B04A769ZNNIA1gWWBL4C/Sg6+CpiTPXfNa8AHAWgGML2w72zg6ioQfQEsEzQ4DtgHWDEOks/PA/cDtwE/A9cA3n6Su4ELgfezZ+o7KNZuFs8FeQDwVBmIPgC2Bu4Bdmiggjx+CTgiM+gs4LqafWsATwC7xJp3ga0i0P+3bVQA+8XtrpZpkzZvxP8tgPVKDPQ25fWNTcEJrAssBtIZRwIPFPeNAmB/4GFghVCm0fJUF/+ZHbBHZBNTZJLrgTNaGJ+WXA6cH3/uAo7vC0DjH8q4rptNhT+UGFXkvEveCyr81hKEFHoh1i4Etu8DoGj848BM4JcSY8zhekWRNsbBBvH/JOD2lgDWjozm8k+i4I0UA12MPxW4OTNezr8JPB3PHgMOaQlgo0ixLrdCG8idAXQx3hwuTVaOU8w210Zt+CaeW2mLub4Kj4E7N14+AhzWFYC53RtL+b2ONuo24Aw8xRR7bHbgq5FypZRVuE0czAMODB168oYuAEyF5u/UqzQZr+63gc0jG/mrN5Kkd79GBiur1Ll9Jof74sF3wCbA110APAvsFRtMkYdWBGzSqZd+hH8+FAg8FSHf22J8BiwHWJRSla2izt6AF7ZSLDgHsA1ZQqrqwJ7Ac7HaPmVH4Nuq0+K5lTkVsiJ9ZmfuvwUw0OuMl7YpjuT+4YUa89/eKgByzUOVWdHPNNjPtoC5Wnkwax02Bl4BpsW73aNPKtPnzefGz4/AtZcqlSoALwM7BWpz8RLcK9G2SnjJhuxFYFdgLeCZrF8qzSShq7Px7qsC8CmwDvAVIIC24iByNHARcFPkfumnfAjsnBWmXOdIxtcBcLSzh5H3yfVtQawawWrhSsab+03Jr5coGdn4OgAGsIGsmL4M5LYibYrG75vFR67nGODWLGAbOV80oopClwEXxOKLgUtbWl9lvM2excuL0KNOXqcUWorOxtd5YEtgEWBAWkTkroWoTqqMt4l7NHRV7bdgnRiTW8u7+ndZ3TxwB3BCaLP4HBxNWdkB0swMYypV5Hyijf1/1fT1OXAJYG1oqsylwOoA6GrTaaqaP8UkZZHSOx6op8w6pwMGbzI+D1gHHwf57YAN45al0pNRba3eI0vTRGY760EaWhQBFPe/Ey2Ho+BSkSYAGuFM6neckwG/pJWJXyEcUs5rWfQmDFwbAOkw64JpbzdAz/j5zylpQQzb+eeRCTOwSVEXAE26xvJ+ADCWa88OHTwweKDnDQwU6nmBvbcPHuh9hT0VTHoP/A0LTuMxcvfaggAAAABJRU5ErkJggg==",
  } as ToolbarItem,
  {
    name: "image",
    title: "Image",
    label: "",
    icon: "",
    iconImage:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAArtJREFUaEPt2cnrVEcQwPHPz8QtehMU0RiI6FEQUdyJiRKEgKK4oBdv6l+gHlwPov4FLuQUFQSj6CVBcUFcQBH0IqIiuF28KbivFLyRx2NmfG9+b37zBqZhLtPV3fXtqq7q6teny1tfl+uvB9BpC/YsUDULjMEBLMJPnVYus/5rnMF6PK/1ZV3oJJZWTPGsOqHjskYAryq481mA0HFkI4AvKemVOI70f50wTnjJahxNLf7Nc7IulFa2ShFqGN50M8BQvK0iQES6zViDn/EER7Ans+OVBAjlz2FmnYN1DX+kIIbgXdUssAtbm0SFndiR9FcS4AEmNgGI/klVBgiXiJ1t1KI/ok+0rrTAfUxOAAbjfdXOQPj4tiYWCP8PmWgDAjAH8YsL160cKXt4EoVm1ZG9ioWpKPQjPrTTAuvwNwYlpl6B0zkhNmEtJuAxDmNfJg+0FWA2ziOSTa2Fv/6Fszkg8oi0DeAXXMfoOlq8xO+4mUfD78i0BSCutFcwpcniUXjMw70GMuFyn3MA/oCPZZ6BWPjfnMXPI8zF05QCcYCj8luFf5Iq61MTkNIBdmNLjp2ridzBgqQUHItTmJ4afyiBaFR7lAoQESN2rWi98AwXsBij6sBH5ImIVK+FxdMWarmgmYZLbSw742q9tw5BKQBh+hsYV8B1ioqGC23AwczAfgPEobuIGUU1akE+olIUOMdSY/sFEP4WBXUU1gPV4tqwBP8lC/YLIC5V2wdK89Q68ZD1Jy4nASOdL3If4nhAiqeVohGnLN4X+A23MwkvF8DUhH5EWdq0OE9k8/m4WzQTR+Yc3+KiZQ97iF+LApStRJnz5XKhMhcse64eQNk7WnS+hhbo+uf1bvjAcQLLaybLJqgoDfcnGbCKn5j+x8Zmn5iK+mLH5Tt1RSgNvAdQ2la2OFHPAi1uXGnDvgKePZUxa4GbwQAAAABJRU5ErkJggg==",
  } as ToolbarItem,
  {
    name: "bold",
    title: "Bold",
    label: "",
    icon: "",
    iconImage:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAcVJREFUaEPtmLsuBVEUhr/TeAaXwgNoFErReADRaRQUFIRGQugQNBqXEAotFVEqiQcgQaHQuIQHIHHPSs5J5JiZk7Vmjr137Emmm732//3/vqxMicCfUuD6iQCuE4wJxARyOvCvl9CX0rxP4Am4APaBHeBZWePX53kS0AJUT34PDABHeSBcAojud6Af2LVCuAYQ3S9AB3BpgfABQHQfAj2+AKSZ0lReLnNAQ5VY2eDNwKMWoh4J1Ko5CSwlCO0D9kIAaAQeEoROAMshALQAtwlCR4H1EACmgMUEoZ3Aqc8AsknlzJ9N2MTnQDugvhxrbbgsQ9STpRSTy6wbONa6L9+7BpDjcwTYtIj3AUD2wrRVvA8AksAaIEfomwXE9RKqaJbWejBkANE+DGxpIeqRQFbNrH7oDmgFPjQQfw1Q0ZbWD3UBJyEAyKUmjlc/Y8BqyAAzwEIIAGn90BCw7TNAVj8kuqUfOnMNoJn/57dXQJu2oavHKWQF6AUOtIN9AVgBxrXifeiFXoH58mtqz10kIL8Tb8p/5DaAa4vzlTF5APLMW9jYCFCYlcZCMQGjcYUNiwkUZqWxUEzAaFxhw2IChVlpLBR8At98JVgxmKHZCAAAAABJRU5ErkJggg==",
  } as ToolbarItem,
  {
    name: "italic",
    title: "Italic",
    label: "",
    icon: "",
    iconImage:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAATxJREFUaEPtl1sOAUEQRc/8WANfrMJjKx5rwVo8tuKxCr5Ygx9SiYjQMumarjaTlE+62r3n1lxR0PBX0XD9uIF/J+gJeAIVCfgKBQDec0K1SMANxCToCfgz8E0gaiuiDsfs5tvZA9APzA6Ao/LO15i1ARG5D4gUU8Oq4mXe2sAamASEToFN3Q10gBPQ+hB6AXrAre4GFsA8IFLeX6YQb7lCQv0MtD+ECvUucK27AdnxVUCkPBOzVOItEzCtzncAFi0k9bgLUJY6HaWkb5WA1OM4IFTqdFt3A1mq03KFslSnlYFs1WllIFt1WhnIVp0WBrJWZ1UDWf+0l9Wu5ofMDZRRjfncE4ih9TyrgfbzazSXNf4ZUEC3G9EkYKdGcbMbUEBLOuIJJMWpuMwTUEBLOuIJJMWpuMwTUEBLOvIAVacwMU4KlX0AAAAASUVORK5CYII=",
  } as ToolbarItem,
  {
    name: "underline",
    title: "Underline",
    label: "",
    icon: "",
    iconImage:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAfJJREFUaEPtmL0vRFEQxX+L0kdDhUIiovVfEIIoNEqFxFd0GiQSvUKiEFHRqXz+F6ITIjQSCRVaQSbuJi937643971dWeZ2+3bmnDlnZu7LboE6P4U6rx8T8NsdtA7UYwc+A0XHdjIzVgxxZtKEAZmxTIBzM8YISbUOxDiX2TXbgYQD1gFb4tK3omoqVMGOy5bYbiG7hTIuno1QxhF6A5q9JrQC8lxzJOfFS3gF2jQgMdfoNdDnkQwAlxpiQHIuvBzB7tfgxAg4BwY9klVgQ0MMrAHrXs4ZMKzBiREwD2x5JE9Ar2KMZExugXYPZw7YrraAbuAeaPSIDoHJMj9SkqFimsROePnvQA/wUG0Bgr8LTAeIpDB5LssYOuL8XqB4id0BZjTFS2zMCEleJ3AFtAQIn92InQI37ntZ+hFgITA2EiKCZXkfayVAeIaA48AoaWv4AMYdljY3ugNFokVgE2hQM38nSPFLgUshNVzsCCUJRoH9MuNUqRAZmyngJHW1gcA8BAhsB7ACzAJNPxQkrh8AyzEz72PnJaCI2wWMuZeRXInyWY5cjXeALPaR9qqsZEjeArJMQ1SuCYiyLcekf9WB0L8ROXpZApXK3FRBDtoEKNuVytxUQX+lA0oDaxOu6UBtKlKymAClYbmHWwdyt1QJ+AWdBFkxz16l8QAAAABJRU5ErkJggg==",
  } as ToolbarItem,
];

export const TOOLBAR_STYLES: Array<ToolbarItem> = [
  {
    name: "markup",
    title: "Markup",
    label: "",
    icon: "",
    iconImage:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAxJJREFUaEPtmkuoTlEUx383YkAoQmQgI49SQh4lihJKJt4DZUCRQh6RyECeA4+594SSCTOPKPIeeJRHyHtiJAYM2H+tneN07tnfd86+93y3zp6c7579Wr+91trrtNZtI9x6AquApcAYoFd4Su6It8AMQM/SrS2wwlDgEjC29E7/LxANIg9AJ3+nA4T3KFEg8gDWAYdtt5/ADuAM8KmkNnYBO22N0hB5ADr9ibbRVmBfScH99CSA3pWCyAP4BvS2XYc4R/7cQQBa9p059utm98gD+J1YLOTszeyb1oCfWwiilQAKaaLVAJqGqAJgo/OtgwGba9ixqwCYBNxuwGkagqgCQLIrus+JAVEVQF/gLDC3LERVAF5uBcqpwKB2QLYkIvbwrDFVA4QUEIxFNUDoCEv21xrwBxjzW6gZpdQaqDXQjL1kjK1NqDah2oT+nUDmVV5/SpQ0kdD0+haqb6GQjQT6axPq0iZUUvudM72q7/xodGkAnwVQ3uZJapdZwDjLUl8FlgWk+AUcA9bbuOtWMMmatsIyEy+BC27eAGClDTwJfGlvrzSA93otqInJJmHWuFzOPWADcDMA8B0YDChNr3bfJbQmZMxRukSCdwMuAgusFvfYxo4HHsQGWOhOZXViUZ2WTu0ucM3eq6qzPwGg18oB3UoJoyqQqkFqnQbgKzdelqfAKEvabkoIqAKJ14BenwMWJfr7OFN5D+jZ8gCyY2lphFVkJLBM8ZDZuMwtmgbkcC9Sqpb6R5sPFNHANmCPqzMfADabzb8yqCOA+qMB5PmnnLgIwDDgEdAd0O/Z7kDO202l8pL8JRrAiYwc/hJgegkNyHx0pW4H1gKLgSnASAc2PzZA6BotogEBqHj+xhy7v9UJ5gFy/Kga6CiAr86JTwPLzUZnAle6GoCiuQKTApX+B0PBM08DR4GPKaeU7/ytKReNxEVNSBpQ6+duHQW6H/Z3HkDWhaLKzuUsgL02WgHnYWqmHG0y8MFujmS37vOBwA2/sHX2AHbbbz29wGmhplnN7Blwyr6L/DdUFsBx4Lk6/gDA1w1Abv2dCQAAAABJRU5ErkJggg==",
  } as ToolbarItem,
  {
    name: "anu-table",
    title: "Table",
    label: "",
    icon: "",
    iconImage:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAVxJREFUaEPtmTtOw0AQhj+ngCK5Qa6ABFWSQ+QEpIcG5y5QpkacILlDUgUJrpALBNNQAJoIS8Za28lG8u5Ys6W1q/kfo9nxToLylSjHT6cIXAL3wC1wBfQjc+cTeAeegQXwJfhyB4bACriODHQVnFdgCuyEgCi/UQQ+J7UFJkJgDjwqUb4M80EIiPojpQTWQuADGCglkAmBnwrwTSXWdU6+9RrE+C4Uj+JWn3iHKmQECjKaAzXp58wUS6GSYlGlkIrKWpdCRqANBcyBNlSui9FpB3x6k6jKqBGoyF3rRss9uLXTsbbToUv8UfE7fQ8cpUDoTeaAOXCmAm3/E0s8uYldy6d1af1dyAiUrbMUOvFZxVLIlUKan9f3nRhwpMDTmfdJqONpPuRbAzehUHjGlUnluDhmXSoi8W/MmgtwAdwBs79Bd2xzswx4A15cg25PF8Mfa2qgwiNsQKCewC8Cf4RoX2kt7wAAAABJRU5ErkJggg==",
  } as ToolbarItem,

  {
    name: "ul",
    title: "Bulleted list",
    label: "",
    icon: "",
    iconImage:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAUJJREFUaEPtmDtuwkAQhj+q5AhEyhGALpwmZdIRhSaIFFBAk6QLlJS5DW1yhTyOENGAVnJhrTDYGht70O/S3pn5HzPe1bZw/rSc40cE6nZQDsgBowJqIaOA5vAsBy6AOXCbVPgAJsDGXLHkBFkE3oCnqNYrME6925aM5Vi6vVizCPwC7SjjH3DlhcBPBDbg/gauvRAI7TKKHHgBnr0QCEM8i4Z46mmIjw1UY75rI6vbCjkgB4wK6CxkFLBIuM5COgsV6Zc9awu1kM5CRrVzh2snzi1VRQvlQEXC5k571g70gLtEihXwmVuWEy7MciCAXwNhPwjPP9CPSDT6XmgJDCIhF8Cjl1uJAPYhIvAODL0Q6CYtdJlqoRvgywuBgLMD3KeGOA3+hGN6uNRZ/0Ybo/IhIHKgbpvkgBwwKqAWMgpoDt8BRag2MY/2fgEAAAAASUVORK5CYII=",
  } as ToolbarItem,
  {
    name: "ol",
    title: "Numbered list",
    label: "",
    icon: "",
    iconImage:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAASdJREFUaEPtmDsOwjAMhr9KMHAjNk6BxM7IirgEOxMzI0fgBhyHCQQoQ5eoj7hVGrtyt0pO4v/hxHKF8a8ynj8OoLSCroArMJKBWVroF5GiGmRTcuYB1ALUQNoUiIGOdHPv8sY8uuzhAHo5lQW4AjK+JooeUwMTpdh9jOo7PoUhB5DCUs6YWSrQ9sKqBJvSCwUHfIBlTisM3buL1RXwANbAAbhEh6juhQKwG7ADzsCpgSHVAELSR+AObIGvJQB74Ao8gQ3wavGnWgXewKIhadO3UMBjBsDQG63IOpWsSphwABK2csSmthKmith8Mxcr3TZeUfuQxYOt+j+2mwMQFrV4LtQ3YlSrgPkiNg9AaM2y4d5KlOVfaY8vIcUtJGErR6wrkINVyZ5/MAArMcqknlsAAAAASUVORK5CYII=",
  } as ToolbarItem,
  {
    name: "img",
    title: "Image",
    label: "",
    icon: "",
    iconImage:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAArtJREFUaEPt2cnrVEcQwPHPz8QtehMU0RiI6FEQUdyJiRKEgKK4oBdv6l+gHlwPov4FLuQUFQSj6CVBcUFcQBH0IqIiuF28KbivFLyRx2NmfG9+b37zBqZhLtPV3fXtqq7q6teny1tfl+uvB9BpC/YsUDULjMEBLMJPnVYus/5rnMF6PK/1ZV3oJJZWTPGsOqHjskYAryq481mA0HFkI4AvKemVOI70f50wTnjJahxNLf7Nc7IulFa2ShFqGN50M8BQvK0iQES6zViDn/EER7Ans+OVBAjlz2FmnYN1DX+kIIbgXdUssAtbm0SFndiR9FcS4AEmNgGI/klVBgiXiJ1t1KI/ok+0rrTAfUxOAAbjfdXOQPj4tiYWCP8PmWgDAjAH8YsL160cKXt4EoVm1ZG9ioWpKPQjPrTTAuvwNwYlpl6B0zkhNmEtJuAxDmNfJg+0FWA2ziOSTa2Fv/6Fszkg8oi0DeAXXMfoOlq8xO+4mUfD78i0BSCutFcwpcniUXjMw70GMuFyn3MA/oCPZZ6BWPjfnMXPI8zF05QCcYCj8luFf5Iq61MTkNIBdmNLjp2ridzBgqQUHItTmJ4afyiBaFR7lAoQESN2rWi98AwXsBij6sBH5ImIVK+FxdMWarmgmYZLbSw742q9tw5BKQBh+hsYV8B1ioqGC23AwczAfgPEobuIGUU1akE+olIUOMdSY/sFEP4WBXUU1gPV4tqwBP8lC/YLIC5V2wdK89Q68ZD1Jy4nASOdL3If4nhAiqeVohGnLN4X+A23MwkvF8DUhH5EWdq0OE9k8/m4WzQTR+Yc3+KiZQ97iF+LApStRJnz5XKhMhcse64eQNk7WnS+hhbo+uf1bvjAcQLLaybLJqgoDfcnGbCKn5j+x8Zmn5iK+mLH5Tt1RSgNvAdQ2la2OFHPAi1uXGnDvgKePZUxa4GbwQAAAABJRU5ErkJggg==",
  } as ToolbarItem,

  {
    name: "anu-code-block",
    title: "Code block",
    label: "",
    icon: "",
    iconImage:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAYlJREFUaEPtmLEOwjAMRN2vhg3Y4KtBHiJZURL7Lm4qpERiQfH5np22bg/583X8uX/ZAFd3cHdgd2CyAvsITRZwOnymA08R0V/GeovInRFiAdT4QyTtOfIVkQ8DwQAU81owJr5VaAXQBUOgBqz5MwBgCASgNn8WAAQRBWiZPxMgDBEB6JnX/1/MnaMRcxMRvRPVy70mPIAV5otpCmIEsNI8DdEDOMN8VBPqRAsgmgg5/qhmGKIGQBNFIFjNEIQFYBONIGY1XYgCMJuoBZGlOYRQgKxEFiJbswuhAG6bIgfd7Mk2r9JdzXKEsiCWmtdJwF7EsxDLzbeGMRbiEvO9aRKFuMz8aByOQlxq3pvnoxDgTWq4HS6IN06vhIDNex2gR1yiJZT5KIDu63XC62CUpXyVqJ/m7hsfYqAFgcSPYGqA8OsqaqCGQON7EBYgbB45QjaxhcgGgMyzAPaayASAzc8AlAlRk2Ys1aG0siqYAUFpbACqbIlBuwOJxaSkdgeosiUG7Q4kFpOS+gHp9YE4BjsehgAAAABJRU5ErkJggg==",
  } as ToolbarItem,
  {
    name: "p",
    title: "Paragraph",
    label: "",
    icon: "",
    iconImage:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAARJJREFUaEPtmDEKAkEQBOsQTBQ/oQ8yFfyFZppqot8Q/2OqqS8wM1EOVLyVhYPeW++gN5+e6a5hgyno+Cs6Pj828G+CJmACYgJeITFAuTwksAUWQF9WbkbgDuyB1Vs+NHADhs30TqZazjiKGdgAy5YT2AHrmIFkMeUS8i+UK+lYHxMwATEBr5AYoFxuAnKEokBIYAJMgZ6o+11+BQ7AI6HmRyo0cAHGDTSav0wklw4NnIGSQuqXzUA5/AwYJHRwAo65Vijh3Hmk/I3myTnexQRMQEzAKyQGKJebgByhKNDW0+LPCbHuVaJNp8XKCbGugbacFksClRNiXQPiRuYv9y+UP/NqRxMwATEBr5AYoFzeeQJP65MaMdYfRFIAAAAASUVORK5CYII=",
  } as ToolbarItem,
  {
    name: "h1",
    title: "Heading 1",
    label: "H1",
    icon: "",
  } as ToolbarItem,
  {
    name: "h2",
    title: "Heading 2",
    label: "H2",
    icon: "",
  } as ToolbarItem,
  {
    name: "h3",
    title: "Heading 3",
    label: "H3",
    icon: "",
  } as ToolbarItem,
  {
    name: "h4",
    title: "Heading 4",
    label: "H4",
    icon: "",
  } as ToolbarItem,
  {
    name: "h5",
    title: "Heading 5",
    label: "H5",
    icon: "",
  } as ToolbarItem,
  {
    name: "h6",
    title: "Heading 6",
    label: "H6",
    icon: "",
  } as ToolbarItem,
];
