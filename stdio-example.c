#define __wasi__

#include <stdlib.h>
#include <stdio.h>
#include <locale.h>

int is_locale_initialised = 0;

static void initLocale()
{
    // The locale must be initialised before using
    // multi byte characters.
    is_locale_initialised = 1;
    setlocale(LC_ALL, "");
}

__attribute__((used)) void callPerror(char* ptr)
{
    if (is_locale_initialised == 0)
        initLocale();

    perror("Help!");
}

__attribute__((used)) void writeToStdout(char* ptr)
{
    // printf(ptr);
    fputs(ptr, stdout);
    fflush(stdout);
}

__attribute__((used)) void writeToStderr(char* ptr)
{
    fputs(ptr, stderr);
    fflush(stderr);
}
