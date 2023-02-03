import { createStyles, Group, Paper, Text, ThemeIcon, SimpleGrid, Title } from '@mantine/core';
import { IconArrowUpRight, IconArrowDownRight } from '@tabler/icons-react';
import React from 'react';
import { roundDigit } from '../math/round';
import { fetchColumnNumber } from '../data/fetch_column';
import { arithmeticMean } from '../math/arithmetic_mean';
import { standardDeviation } from '../math/standard_deviation';
import CountUp from 'react-countup';
import { valueGetters } from '@mantine/core/lib/Box/style-system-props/value-getters/value-getters';

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
    icon: "up" | "down";

    value: number;
    value_is_percent: boolean;

    small_value: number;
    small_description: string;
    small_value_is_percent: boolean;
  }[];
}

const icons = {
  up: IconArrowUpRight,
  down: IconArrowDownRight,
};

export function StatsGridIcons({ data }: StatsGridIconsProps) {
  const { classes } = useStyles();
  const stats = data.map((stat, map_index) => {
    const DiffIcon = icons[stat.icon];

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
              <CountUp end={stat.value} duration={1.5} decimals={3 * +stat.value_is_percent}/>
              {stat.value_is_percent ? "%" : ""}
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
            <CountUp end={stat.small_value} duration={1.5} decimals={2 * +stat.small_value_is_percent}/>
            {stat.small_value_is_percent ? "%" : ""}
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
      "icon": compare_average ? "up" : "down",
      "value": personal_average,
      "value_is_percent": true,
      "small_value": personal_stddev,
      "small_description": "standard deviation",
      "small_value_is_percent": true
    },
    {
      "title": "Class Average",
      "icon": compare_average ? "down" : "up",
      "value": class_average,
      "value_is_percent": true,
      "small_value": class_stddev,
      "small_description": "standard deviation",
      "small_value_is_percent": true
    },
    {
      "title": "Absolute Difference",
      "icon": compare_average ? "up" : "down",
      "value": Math.abs(personal_average - class_average),
      "value_is_percent": true,
      "small_value": abs_diff_stddev,
      "small_description": `standard deviation of difference in averages`,
      "small_value_is_percent": true
    },
    {
      "title": "Full Marks",
      "icon": perfect_mark_count ? "up" : "down",
      "value": perfect_mark_count,
      "value_is_percent": false,
      "small_value": perfect_mark_count / personal_numbers.length * 100,
      "small_description": "of all exams",
      "small_value_is_percent": true
    }
  ];
}