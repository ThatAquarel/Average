import { createStyles, Group, Paper, Text, ThemeIcon, SimpleGrid, Title } from '@mantine/core';
import { IconArrowUpRight, IconArrowDownRight } from '@tabler/icons-react';
import React from 'react';
import { roundDigit } from '../math/round';
import { fetchColumnNumber } from '../data/fetch_column';
import { arithmeticMean } from '../math/arithmetic_mean';
import { standardDeviation } from '../math/standard_deviation';

const useStyles = createStyles((theme) => ({
  root: {
    padding: theme.spacing.xl * 1.5,
  },

  label: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
}));

export interface StatsGridIconsProps {
  data: {
    title: string;
    value: number | string;
    icon: "up" | "down";
    small_value: number | string;
    small_description: string;
  }[];
}

const icons = {
  up: IconArrowUpRight,
  down: IconArrowDownRight,
};

export function StatsGridIcons({ data }: StatsGridIconsProps) {
  const { classes } = useStyles();
  const stats = data.map((stat) => {
    const DiffIcon = icons[stat.icon];

    let formatValue = (x: number | string, digits: number) => {
      if (typeof x === "string") {
        return x;
      }

      let rounded = roundDigit(x, digits);
      return `${rounded}%`;
    }

    return (
      <Paper withBorder p="md" radius="md" key={stat.title}>
        <Group position="apart">
          <div>
            <Text
              color="dimmed"
              transform="uppercase"
              weight={700}
              size="xs"
              className={classes.label}
            >
              {stat.title}
            </Text>
            <Title weight={700} size="h1">
              {formatValue(stat.value, 3)}
            </Title>
          </div>
          <ThemeIcon
            color="gray"
            variant="light"
            sx={(theme) => ({ color: stat.icon === "up" ? theme.colors.teal[6] : theme.colors.red[6] })}
            size={38}
            radius="md"
          >
            <DiffIcon size={28} stroke={1.5} />
          </ThemeIcon>
        </Group>
        <Text color="dimmed" size="sm" mt="md">
          <Text component="span" color={stat.icon === "up" ? 'teal' : 'red'} weight={700}>
            {formatValue(stat.small_value, 2)}
          </Text>{' '}
          {stat.small_description}
        </Text>
      </Paper>
    );
  });

  return (
    <div className={classes.root}>
      <SimpleGrid cols={4} breakpoints={[{ maxWidth: 'sm', cols: 1 }]}>
        {stats}
      </SimpleGrid>
    </div>
  );
}

export function generateStatCardsData(): StatsGridIconsProps["data"] {
  const personal_numbers = fetchColumnNumber(7);
  const class_numbers = fetchColumnNumber(8);

  const personal_average = arithmeticMean(personal_numbers);
  const class_average = arithmeticMean(class_numbers);

  const personal_stddev = standardDeviation(personal_numbers);
  const class_stddev = standardDeviation(class_numbers);

  const compare_average = personal_average > class_average;

  const abs_diff_numbers = personal_numbers
    .slice(0, Math.min(personal_numbers.length, class_numbers.length))
    .map((personal_number, i) => {
      let class_number = class_numbers[i];
      return personal_number - class_number;
    });
  const abs_diff_stddev = standardDeviation(abs_diff_numbers);

  let perfect_mark_count = 0;
  personal_numbers.forEach(x => {
    if (x === 100) {
      perfect_mark_count++;
    }
  });

  return [
    {
      "title": "Personal Average",
      "value": personal_average,
      "icon": compare_average ? "up" : "down",
      "small_value": personal_stddev,
      "small_description": "standard deviation"
    },
    {
      "title": "Class Average",
      "value": class_average,
      "icon": compare_average ? "down" : "up",
      "small_value": class_stddev,
      "small_description": "standard deviation"
    },
    {
      "title": "Absolute Difference",
      "value": Math.abs(personal_average - class_average),
      "icon": compare_average ? "up" : "down",
      "small_value": abs_diff_stddev,
      "small_description": `standard deviation of difference in averages`
    },
    {
      "title": "Full Marks",
      "value": `${perfect_mark_count}`,
      "icon": perfect_mark_count ? "up": "down",
      "small_value": perfect_mark_count / personal_numbers.length * 100,
      "small_description": "of all exams"
    }
  ];
}