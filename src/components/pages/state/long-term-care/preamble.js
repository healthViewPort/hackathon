import React from 'react'
import { Link } from 'gatsby'
import OverviewWrapper from '~components/common/overview-wrapper'
import LongTermCareOverview from './overview'
import downloadDataStyles from '../download-data.module.scss'
import longTermCarePreambleStyle from './preamble.module.scss'
import stateGradeStyle from '../state-grade.module.scss'
import { FormatDate } from '~components/utils/format'
import { icons, adjectives } from '../state-grade'

const LongTermCarePreamble = ({
  state,
  stateSlug,
  overview,
  assessment,
  showFacilities = false,
}) => {
  let facilities = null
  Object.keys(overview).forEach(key => {
    if (key.search('outbrkfac') > -1 && overview[key] !== null) {
      facilities += overview[key]
    }
  })
  return (
    <OverviewWrapper>
      <h2 className="a11y-only">State overview</h2>
      <LongTermCareOverview facilities={facilities} overview={overview} />
      <div className={longTermCarePreambleStyle.container}>
        <p>
          <span>
            Last updated{' '}
            <strong>
              <FormatDate date={overview.date} format="LLLL d, yyyy" />
            </strong>
          </span>
          <a
            href="https://raw.githubusercontent.com/COVID19Tracking/long-term-care-data/master/state_overview.csv"
            className={downloadDataStyles.button}
            download="state_overview.csv"
          >
            Download state dataset
          </a>
          {showFacilities && (
            <a
              href={`https://raw.githubusercontent.com/COVID19Tracking/long-term-care-data/master/facilities_${state.toLowerCase()}.csv`}
              className={downloadDataStyles.button}
              download={`facilities_${state.toLowerCase()}.csv`}
            >
              Download facility-level dataset
            </a>
          )}
          <Link href="#summary" className={downloadDataStyles.button}>
            Overview
          </Link>
          <Link href="#notes" className={downloadDataStyles.button}>
            Notes
          </Link>
          <Link href="#facilities" className={downloadDataStyles.button}>
            Facilities
          </Link>
        </p>
      </div>
      <p className={longTermCarePreambleStyle.grade}>
        <img
          src={icons[assessment]}
          className={stateGradeStyle.icon}
          alt=""
          aria-hidden
        />{' '}
        <span>
          <Link to={`/data/state/${stateSlug}/assessment#long-term-care`}>
            {adjectives[assessment]} issues exist
          </Link>{' '}
          with this state&apos;s data
        </span>
      </p>
      <p>
        Do you have information about a long-term-care facility in this state?{' '}
        <Link to="/data/long-term-care/contact">
          We would love to hear from you
        </Link>
        .
      </p>
    </OverviewWrapper>
  )
}

export default LongTermCarePreamble
