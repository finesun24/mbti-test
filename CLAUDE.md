# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 프로젝트 개요

MBTI 공부법 연구소 — HTML 여러 페이지로 구성된 콘텐츠 사이트.

## 디자인 가이드

디자인 시스템 레퍼런스: [adobe.com/kr](https://www.adobe.com/kr/) (Adobe Spectrum 톤 참고)

- 배경: 라이트 모드는 화이트(#ffffff) 기반, 다크 모드는 다크 그레이(#131313) 기반
- 포인트 컬러: Adobe 레드 (`--accent`, 라이트 `#eb1000` / 다크 `#ff513d`)
- 폰트: Noto Sans KR (Adobe 웹사이트가 한국어 본문에 사용하는 폰트, Google Fonts로 로드)
- 버튼: pill 형태(border-radius 999px), 헤딩은 굵게(font-weight 800~900)
- 다크/라이트 모드 토글 필수 — 헤더 상단에 토글 버튼(`#theme-toggle`) 배치
  - 기본값은 시스템 설정(prefers-color-scheme)을 따르고, 사용자가 토글하면 `localStorage`에 저장해 다음 방문에도 유지
  - 색상 값은 `css/base.css`의 CSS 변수(`--bg`, `--surface`, `--accent`, `--text` 등)로 관리하고 다른 CSS 파일은 이 변수만 참조할 것
- 모바일 반응형 필수

## 규칙

- 서버·API·키는 절대 사용하지 않는다 (정적 파일만 사용)
- 파일이 300줄을 넘으면 분리를 먼저 제안할 것
